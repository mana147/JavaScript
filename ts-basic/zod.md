# Zod — Validate Runtime & Tự Sinh Type

_Mục 4 của lộ trình. Học sau [advanced.md](advanced.md), đặc biệt là mục 10 (Type Guard)._

File thực hành: [zod-demo.ts](zod-demo.ts) — 10 section, đánh số khớp doc này.

```bash
npm install zod
npx tsx zod-demo.ts
```

> Doc này dùng **Zod v4**. Nếu anh xem tutorial cũ (v3) sẽ thấy vài API khác — mục cuối có bảng đối chiếu.

---

## Tại sao cần Zod?

Đây là điều phải hiểu cho thật thấm, vì nó là lý do tồn tại của cả thư viện.

**TypeScript chỉ tồn tại lúc compile. Khi code chạy thật, mọi type biến mất sạch.** Nghĩa là dữ liệu đến từ bên ngoài chương trình — API response, form người dùng nhập, file JSON, `localStorage`, biến môi trường — **không được TS kiểm tra gì cả**. Ép kiểu bằng `as` chỉ là lời hứa suông:

```ts
const duLieuTho = JSON.parse('{"id": "sai kieu", "ten": 123}');
const sp = duLieuTho as SanPham; // TS im lặng cho qua

sp.id.toFixed(2); // 💥 CRASH lúc chạy: sp.id là string, làm gì có .toFixed
```

TS tin `sp.id` là `number` vì anh **bảo** nó thế. Nhưng thực tế là `string`. `as` = "tin tôi đi", không phải "kiểm tra giúp tôi".

**Zod lấp đúng lỗ hổng đó — nó kiểm tra ở runtime.** Và phần thưởng kèm theo lớn không kém: từ một schema, Zod cho anh **cả** validator (chạy thật) **lẫn** type (compile). Một nguồn sự thật duy nhất.

```
              ┌──────────────┐
              │  Zod Schema  │  ← khai báo MỘT lần
              └──────┬───────┘
           ┌─────────┴─────────┐
           ▼                   ▼
   .parse() lúc chạy      z.infer<> lúc compile
   (validator runtime)    (TypeScript type)
```

So với **type guard viết tay** ở [advanced.md mục 10](advanced.md): ở đó anh phải tự viết ~10 dòng check, và **TS không kiểm tra logic bên trong** — viết sai là type-safety thành ảo giác. Zod loại bỏ hẳn rủi ro đó: validator được sinh tự động từ schema, không thể lệch với type.

---

## 1–2. Schema cơ bản & `.parse()`

Khai báo "hình dạng" dữ liệu mong muốn bằng `z.object`:

```ts
import { z } from 'zod';

const SanPhamSchema = z.object({
  id: z.number(),
  ten: z.string(),
  gia: z.number(),
  tonKho: z.boolean(),
});

const sp = SanPhamSchema.parse({ id: 1, ten: 'Dell', gia: 12000000, tonKho: true });
```

`.parse(data)`:
- Dữ liệu **hợp lệ** → trả về chính dữ liệu đó (đã có type).
- Dữ liệu **sai** → **throw** `ZodError`.

## 3. `z.infer` — tự sinh type (điểm ăn tiền nhất)

Không cần viết `interface` riêng nữa. Type rút thẳng từ schema:

```ts
type SanPham = z.infer<typeof SanPhamSchema>;
// => { id: number; ten: string; gia: number; tonKho: boolean }
```

Sửa schema → type tự đổi theo. Đây là khác biệt căn bản so với cách làm cũ (viết `interface` **và** viết validate riêng, rồi hai thứ dần lệch nhau). Với Zod, schema là nguồn duy nhất.

> Nhớ `typeof`: `z.infer` cần **type của schema** (`typeof SanPhamSchema`), không phải bản thân biến schema. Đây chính là `typeof` ở tầng type đã học ở [advanced.md mục 2](advanced.md).

## 4. `safeParse` — không throw

`.parse()` throw khi sai nên phải bọc `try/catch`. `.safeParse()` trả về một object để anh tự xử lý — thường gọn hơn:

```ts
const kq = SanPhamSchema.safeParse(duLieuTho);

if (kq.success) {
  console.log(kq.data.ten); // kq.data có type SanPham
} else {
  console.log(kq.error.issues); // mảng lỗi chi tiết
}
```

Để ý: `{ success: true, data } | { success: false, error }` **chính là discriminated union** ở [advanced.md mục 12](advanced.md). Check `kq.success` xong, TS narrow đúng nhánh — có `.data` hay có `.error`. Kiến thức nối liền mạch.

`error.issues` là mảng, mỗi phần tử cho biết chính xác field nào sai:

```ts
kq.error.issues.forEach((issue) => {
  console.log(`[${issue.path.join('.')}]: ${issue.message}`);
});
// [id]: Invalid input: expected number, received string
```

## 5. Validation chi tiết — thứ TypeScript không làm được

TS chỉ kiểm tra **kiểu**. Zod kiểm tra cả **giá trị** — email có đúng định dạng không, tuổi có ≥ 18 không, chuỗi có đủ dài không:

```ts
const NguoiDungSchema = z.object({
  email: z.email('Email khong hop le'),
  tuoi: z.number().int().min(18, 'Phai tu 18 tuoi').max(120),
  ten: z.string().min(2, 'Ten qua ngan').max(50),
  website: z.url().optional(), // có cũng được, không có cũng được
  vaiTro: z.enum(['user', 'admin', 'guest']), // chỉ nhận 3 giá trị
  diem: z.number().default(0), // thiếu thì tự điền 0
});
```

Các validator hay dùng:

| Kiểu | Ràng buộc thường gặp |
| --- | --- |
| `z.string()` | `.min(n)` `.max(n)` `.length(n)` `.regex(...)` `.trim()` |
| `z.number()` | `.int()` `.min(n)` `.max(n)` `.positive()` `.nonnegative()` |
| Chuỗi đặc biệt | `z.email()` `z.url()` `z.uuid()` `z.iso.datetime()` |
| Bổ nghĩa | `.optional()` `.nullable()` `.default(v)` |

> **Lưu ý Zod v4:** các validator chuỗi đặc biệt giờ là **hàm cấp cao nhất** — `z.email()`, `z.url()`, `z.uuid()`. Ở v3 chúng viết là `z.string().email()`. Cách cũ vẫn chạy nhưng đã deprecated.

## 6. Schema lồng nhau & mảng

Schema ghép vào nhau tự nhiên như Lego, và `z.infer` suy ra được cả cây type lồng nhau:

```ts
const DonHangSchema = z.object({
  maDon: z.string(),
  khachHang: NguoiDungSchema, // lồng schema vào schema
  sanPham: z.array(SanPhamSchema), // mảng SanPham
  tongTien: z.number().positive(),
});

type DonHang = z.infer<typeof DonHangSchema>; // type lồng nhau, tự suy ra hết
```

## 7. Biến đổi dữ liệu — `transform` & `coerce`

`.transform()` đổi dữ liệu **sau khi** validate:

```ts
const ChuoiThanhSo = z.string().transform((s) => s.length);
ChuoiThanhSo.parse('hello'); // => 5
```

`z.coerce` tự **ép kiểu trước khi** validate — cực hữu ích cho query param, form (luôn là string), biến môi trường:

```ts
const CauHinhSchema = z.object({
  port: z.coerce.number(), // "3000" -> 3000
  debug: z.coerce.boolean(),
});
CauHinhSchema.parse({ port: '3000', debug: 'yes' }); // { port: 3000, debug: true }
```

> ⚠️ **Bẫy của `z.coerce.boolean()`:** nó chạy `Boolean(value)`, nên **mọi chuỗi không rỗng đều thành `true`** — kể cả chuỗi `"false"`! Muốn hiểu `"true"`/`"false"` cho đúng thì đừng dùng coerce, hãy viết:
> ```ts
> z.enum(['true', 'false']).transform((v) => v === 'true')
> ```

## 8. Ràng buộc tùy ý — `.refine()`

Khi cần luật riêng mà Zod không có sẵn, ví dụ so khớp hai field:

```ts
const DangKySchema = z
  .object({
    matKhau: z.string().min(6),
    xacNhanMatKhau: z.string(),
  })
  .refine((data) => data.matKhau === data.xacNhanMatKhau, {
    message: 'Mat khau xac nhan khong khop',
    path: ['xacNhanMatKhau'], // gắn lỗi vào đúng field này
  });
```

`.refine()` chạy sau khi các field lẻ đã pass, và nhìn được toàn bộ object nên kiểm tra chéo field được.

## 9. Mẫu thực tế — validate response API

Đây là luồng đáng nhớ nhất, anh sẽ viết đi viết lại trong dự án thật:

```ts
async function taiSanPham(): Promise<KetQuaTai<SanPham>> {
  const res = await fetch('/api/san-pham/99');
  const responseTho: unknown = await res.json(); // res.json() luôn trả về `any`/unknown

  // validate NGAY tại ranh giới hệ thống — chỉ tin sau khi parse
  const kq = SanPhamSchema.safeParse(responseTho);
  if (!kq.success) {
    return { trangThai: 'error', loi: kq.error.issues[0].message };
  }

  // từ đây kq.data đảm bảo đúng CẢ kiểu LẪN giá trị
  return { trangThai: 'success', duLieu: kq.data };
}
```

**Nguyên tắc vàng: validate ở *ranh giới* của hệ thống.** Mọi chỗ dữ liệu từ ngoài đi vào (`fetch`, `req.body`, `JSON.parse`, `localStorage`, `process.env`) — parse ngay tại đó. Qua được ranh giới rồi thì bên trong app dùng type thoải mái, không cần check lại, vì đã chắc chắn đúng.

```
  Ngoài (unknown, không tin được)  │  Trong (đã validate, type an toàn)
  ─────────────────────────────────┼──────────────────────────────────
   fetch / form / env / JSON  ──► [ Zod.parse ] ──►  dùng thoải mái
```

## 10. Zod thay cho type guard viết tay

Type guard "miễn phí" ngay từ schema — thay cho hàm `laSanPham()` phải viết tay ở [advanced.md mục 10](advanced.md):

```ts
function laSanPham(x: unknown): x is SanPham {
  return SanPhamSchema.safeParse(x).success;
}
```

Ngắn hơn, và **không thể lệch với type** vì cả hai cùng sinh ra từ một schema.

---

## Zod v3 → v4: những gì đã đổi

Tutorial trên mạng đa phần còn là v3. Bảng đối chiếu để anh khỏi bối rối:

| Việc | Zod v3 | Zod v4 (bản đang dùng) |
| --- | --- | --- |
| Email | `z.string().email()` | `z.email()` |
| URL | `z.string().url()` | `z.url()` |
| UUID | `z.string().uuid()` | `z.uuid()` |
| Danh sách lỗi | `error.errors` | `error.issues` (v3 cũng có) |
| Thông báo lỗi tùy biến | `{ message: '...' }` | `{ message: '...' }` (giữ nguyên) |

> `error.issues` hoạt động ở **cả** v3 lẫn v4, nên cứ dùng nó cho chắc.

## Khi nào dùng / không dùng Zod

| Dùng Zod | Không cần Zod |
| --- | --- |
| API response (`fetch`, axios) | Dữ liệu nội bộ do chính app tạo ra |
| Form người dùng nhập | Hằng số viết cứng trong code |
| `req.body` ở backend (Express, Nest) | Giá trị đã được validate ở tầng trên |
| `process.env` (env luôn là string) | Nơi ưu tiên tốc độ tuyệt đối (Zod có chi phí runtime) |
| `JSON.parse`, `localStorage` | |

> Nguyên tắc gọn: **dữ liệu qua ranh giới hệ thống thì validate; dữ liệu bên trong thì tin type.**

## Sai lầm thường gặp

| Sai lầm | Nên làm |
| --- | --- |
| Viết `interface` **và** schema riêng | Chỉ viết schema, `z.infer` ra type. Tránh 2 nguồn lệch nhau |
| Ép `as SanPham` cho response API | Dùng `.safeParse()`. `as` không kiểm tra gì lúc chạy |
| Dùng `z.coerce.boolean()` cho `"true"/"false"` | Mọi chuỗi khác rỗng đều thành `true`. Dùng `.enum().transform()` |
| `.parse()` mà quên `try/catch` | Response lỗi làm throw → sập app. Dùng `.safeParse()` cho dữ liệu ngoài |
| Validate ở tận sâu trong logic | Validate ngay tại ranh giới, một lần, rồi tin |

## Học tiếp

Còn lại trong [lộ trình](doc.md#6-học-tiếp-gì):

5. ⬜ **TypeScript với framework** — React (`.tsx`), Vue, Node/Express. Zod ghép rất đẹp với react-hook-form và validate `req.body` ở Express.
6. ⬜ **ESLint + Prettier** cho TypeScript

## Tài liệu tham khảo

- [Zod — Trang chủ & docs](https://zod.dev)
- [Zod v4 — Changelog](https://zod.dev/v4) — xem đầy đủ khác biệt so với v3
- [Zod — Basic usage](https://zod.dev/?id=basic-usage)
- [react-hook-form + Zod](https://react-hook-form.com/get-started#SchemaValidation) — để dành cho mục 5
