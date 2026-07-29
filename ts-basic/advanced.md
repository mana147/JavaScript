# TypeScript Nâng Cao

_Phần tiếp theo sau [doc.md](doc.md). Dành cho người đã nắm chắc phần căn bản._

File thực hành: [advanced.ts](advanced.ts) — 14 section, đánh số khớp với doc này.

```bash
npx tsx advanced.ts          # chạy thẳng
npx tsc && node dist/advanced.js   # hoặc build rồi chạy
```

---

## Đổi cách nghĩ trước khi bắt đầu

Ở phần căn bản, anh dùng type để **mô tả** dữ liệu: `string`, `number`, `interface SanPham`.

Ở phần nâng cao, anh dùng type để **tính toán ra** type khác. TypeScript có hẳn một ngôn ngữ lập trình riêng chạy ở tầng type, với đầy đủ:

| Ở tầng giá trị (JS thường) | Ở tầng type |
| --- | --- |
| Biến | Type parameter `<T>` |
| `if / else` | Conditional type `T extends U ? X : Y` |
| Vòng lặp | Mapped type `{ [K in keyof T]: ... }` |
| Hàm | Generic type `type F<T> = ...` |
| Destructuring | `infer` |
| Nối chuỗi | Template literal type `` `btn-${T}` `` |

Toàn bộ thứ này chạy **lúc compile** rồi biến mất hoàn toàn khỏi file `.js`. Không tốn một byte runtime nào.

> Mục tiêu không phải để viết type "ảo diệu". Mục tiêu là: **một nguồn sự thật duy nhất**. Định nghĩa type một lần, những type liên quan tự suy ra — sửa một chỗ là cả hệ thống tự cập nhật theo.

---

## 1. `keyof` — lấy union các key

```ts
interface SanPham {
  id: number;
  ten: string;
  gia: number;
  tonKho: boolean;
}

type KeySanPham = keyof SanPham; // 'id' | 'ten' | 'gia' | 'tonKho'
```

Ứng dụng kinh điển — hàm lấy field vừa an toàn vừa giữ đúng kiểu trả về:

```ts
function layField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

layField(laptop, 'ten'); // TS hiểu: string
layField(laptop, 'gia'); // TS hiểu: number
layField(laptop, 'mauSac'); // ❌ Error: 'mauSac' không phải key của SanPham
```

Hãy để ý điểm hay: hàm này **không** trả về `string | number | boolean`. Nó trả về **đúng** kiểu của field mà anh truyền vào. Đây là thứ mà JS thuần không bao giờ làm được.

## 2. `typeof` — lấy type từ một giá trị

Đây là `typeof` ở **tầng type**, khác hẳn `typeof` lúc runtime của JS (dù viết giống nhau).

```ts
const cauHinhMacDinh = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  debug: false,
};

type CauHinh = typeof cauHinhMacDinh;
// => { apiUrl: string; timeout: number; debug: boolean }
```

Thay vì gõ lại interface cho một object đã có sẵn, để TS tự suy ra. Object đổi thì type đổi theo — không bao giờ lệch nhau.

Kết hợp `keyof` + `typeof` là mẫu dùng hằng ngày:

```ts
type KeyCauHinh = keyof typeof cauHinhMacDinh; // 'apiUrl' | 'timeout' | 'debug'
```

> Thứ tự đọc: `typeof cauHinhMacDinh` cho ra type của object, rồi `keyof` lấy các key của type đó.

## 3. Indexed Access — `T['key']`

```ts
type KieuGia = SanPham['gia']; // number
type KieuIdTen = SanPham['id' | 'ten']; // number | string
```

Mẹo quan trọng — lấy kiểu phần tử của mảng bằng `[number]`:

```ts
const danhSachMau = ['do', 'xanh', 'vang'] as const;
type Mau = (typeof danhSachMau)[number]; // 'do' | 'xanh' | 'vang'
```

Đây là cách rất hay dùng: khai báo **mảng giá trị một lần**, rồi rút type ra từ chính nó. Thêm màu mới vào mảng thì type tự có thêm — không cần sửa 2 chỗ.

`as const` là bắt buộc ở đây. Không có nó, TS suy ra `string[]` và `Mau` sẽ thành `string`.

## 4. Mapped Types — vòng lặp ở tầng type

Cú pháp: `{ [K in keyof T]: <kiểu mới> }`. Đây chính là cách `Partial`, `Readonly`... được viết trong thư viện chuẩn của TS:

```ts
type TuPartial<T> = { [K in keyof T]?: T[K] };
type TuReadonly<T> = { readonly [K in keyof T]: T[K] };
```

Ví dụ thực tế — object chứa message lỗi cho từng field của form:

```ts
type LoiCuaForm<T> = { [K in keyof T]?: string };

const loiForm: LoiCuaForm<SanPham> = {
  ten: 'Ten khong duoc de trong',
  gia: 'Gia phai lon hon 0',
  // mauSac: '...'   ❌ Error — SanPham không có field này
};
```

Form đổi field thì type lỗi tự đổi theo. Không bao giờ có chuyện validate một field đã bị xoá.

**Modifier `-`** để gỡ bỏ `?` và `readonly`:

```ts
type BatBuocHet<T> = { [K in keyof T]-?: T[K] }; // gỡ optional
type BoReadonly<T> = { -readonly [K in keyof T]: T[K] }; // gỡ readonly
```

## 5. Key Remapping — đổi tên key bằng `as`

Thêm `as` vào mapped type để đổi luôn tên key:

```ts
type BoField<T, KeyCanBo extends keyof T> = {
  [K in keyof T as K extends KeyCanBo ? never : K]: T[K];
};

type SanPhamKhongId = BoField<SanPham, 'id'>; // { ten, gia, tonKho }
```

**Quy tắc mấu chốt: trả về `never` thì key đó bị loại khỏi kết quả.** Đây là cách lọc field ở tầng type — cũng chính là cách `Omit` hoạt động bên trong.

## 6. Template Literal Types — ghép chuỗi ở tầng type

```ts
type Mau = 'primary' | 'danger';
type KichThuoc = 'sm' | 'md' | 'lg';

type ClassButton = `btn-${Mau}-${KichThuoc}`;
// TS nhân chéo mọi tổ hợp: 2 x 3 = 6 giá trị hợp lệ
// 'btn-primary-sm' | 'btn-primary-md' | ... | 'btn-danger-lg'

const classNut: ClassButton = 'btn-primary-lg'; // ✅
const classSai: ClassButton = 'btn-primary-xl'; // ❌ Error
```

Có sẵn 4 helper biến đổi chuỗi: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`:

```ts
type SuKien = 'click' | 'focus';
type TenHandler = `on${Capitalize<SuKien>}`; // 'onClick' | 'onFocus'
```

> Cẩn thận: union nhân chéo rất nhanh. 3 union mỗi cái 10 phần tử = 1000 type. TS có giới hạn (khoảng 100.000) và sẽ báo lỗi nếu vượt.

## 7. Mapped + Template Literal

Ghép 2 thứ trên lại thì sinh được cả bộ API từ một interface:

```ts
type Getters<T> = {
  [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];
};

// Getters<SanPham> tự động thành:
// {
//   getId: () => number;
//   getTen: () => string;
//   getGia: () => number;
//   getTonKho: () => boolean;
// }
```

Thêm một field vào `SanPham` → getter tương ứng tự xuất hiện, và TS sẽ báo lỗi ở chỗ nào chưa implement.

`keyof T & string` là để lọc bỏ key kiểu `number`/`symbol` — template literal chỉ ghép được string.

## 8. Conditional Types — `if / else` ở tầng type

Cú pháp: `T extends U ? X : Y` — đọc là _"nếu T gán được vào U thì trả X, không thì trả Y"_.

```ts
type BoRong<T> = T extends null | undefined ? never : T;
type ChacChanCoChuoi = BoRong<string | null | undefined>; // string
```

**Tính phân phối (distributive) — điểm hay gây bất ngờ nhất:** khi `T` là union, conditional type **tự động tính từng nhánh một** rồi gộp kết quả lại:

```
BoRong<string | null | undefined>
  => BoRong<string> | BoRong<null> | BoRong<undefined>
  => string        | never       | never
  => string
```

`never` bị nuốt mất khi nằm trong union — đó là lý do kỹ thuật lọc union bằng `never` hoạt động được.

> Muốn **tắt** tính phân phối thì bọc trong ngoặc vuông: `[T] extends [U] ? X : Y`.

## 9. `infer` — bắt type ra từ bên trong type khác

`infer` chỉ dùng được bên trong conditional type. Ý nghĩa: _"chỗ này là kiểu gì đó, đặt tên cho nó là `U` rồi trả về cho tôi"_. Giống destructuring, nhưng ở tầng type.

```ts
// Lấy kiểu phần tử của mảng
type PhanTuCua<T> = T extends (infer U)[] ? U : T;
PhanTuCua<string[]>; // string
PhanTuCua<SanPham[]>; // SanPham
PhanTuCua<number>; // number (không phải mảng thì trả về chính nó)

// Lấy kiểu trả về của hàm — đây chính là ReturnType có sẵn
type KieuTraVeCua<T> = T extends (...args: never[]) => infer R ? R : never;

// Bóc kiểu bên trong Promise — đây chính là Awaited có sẵn
type BocPromise<T> = T extends Promise<infer U> ? U : T;
BocPromise<Promise<string>>; // string
```

Hiểu `infer` rồi thì anh đọc được source của gần như mọi utility type trong `lib.es5.d.ts`.

## 10. Type Guard tự viết — dạy TS cách nhận biết kiểu

Đây là phần **thực dụng nhất** của cả doc này.

**Vấn đề:** dữ liệu từ API về là `unknown`. `typeof` chỉ phân biệt được primitive, không phân biệt được `SanPham` với object bất kỳ.

**Giải pháp:** hàm trả về `x is T` — gọi là _type predicate_. Nếu hàm trả `true`, TS **tin** rằng `x` có kiểu `T` trong nhánh đó:

```ts
function laSanPham(x: unknown): x is SanPham {
  return (
    typeof x === 'object' &&
    x !== null &&
    'id' in x &&
    'ten' in x &&
    typeof (x as SanPham).id === 'number' &&
    typeof (x as SanPham).ten === 'string'
  );
}

function xuLyDuLieuApi(duLieu: unknown): string {
  if (laSanPham(duLieu)) {
    return `San pham: ${duLieu.ten}`; // ✅ TS gợi ý đầy đủ field
  }
  return 'Du lieu sai dinh dang';
}
```

> ⚠️ **Điều tối quan trọng phải hiểu:** TS **không kiểm tra** logic bên trong type guard. Anh viết `return true;` thì TS vẫn tin sái cổ. Chữ `is` là **anh cam kết với compiler**, không phải compiler chứng minh giúp anh. Viết ẩu ở đây thì type an toàn chỉ là ảo giác — và đó chính là lý do người ta dùng **Zod** (mục 4 của lộ trình) để sinh validator tự động thay vì viết tay.

## 11. Assertion Function — `asserts x is T`

Khác type guard ở chỗ: không trả `boolean` mà **throw** nếu sai. Sau khi gọi xong, TS coi biến đã đúng kiểu ở **toàn bộ phần còn lại** của scope — không cần bọc `if`:

```ts
function khangDinhLaSanPham(x: unknown): asserts x is SanPham {
  if (!laSanPham(x)) throw new Error('Du lieu khong phai SanPham');
}

function inTenSanPham(duLieu: unknown): string {
  khangDinhLaSanPham(duLieu);
  return duLieu.ten; // ✅ từ đây TS coi duLieu là SanPham
}
```

Dùng khi: sai là hỏng, không có đường xử lý mềm. Còn cần rẽ nhánh thì dùng type guard ở mục 10.

> Lưu ý cú pháp: assertion function **không** gán vào biến `const` kiểu arrow được nếu không ghi type tường minh. Cứ dùng `function` declaration cho lành.

## 12. Discriminated Union — mẫu quan trọng nhất

Nếu anh chỉ nhớ được một thứ từ cả doc này, hãy nhớ mục này.

**Ý tưởng:** mỗi nhánh của union có chung một field literal để phân biệt (ở đây là `trangThai`). TS dựa vào field đó để narrow cực chính xác:

```ts
type TrangThaiTai<T> =
  | { trangThai: 'idle' }
  | { trangThai: 'loading' }
  | { trangThai: 'success'; duLieu: T }
  | { trangThai: 'error'; loi: string };

function hienThi(state: TrangThaiTai<SanPham>): string {
  switch (state.trangThai) {
    case 'idle':
      return 'Chua tai gi ca';
    case 'loading':
      return 'Dang tai...';
    case 'success':
      return `Da tai xong: ${state.duLieu.ten}`; // chỉ nhánh này có .duLieu
    case 'error':
      return `Loi: ${state.loi}`; // chỉ nhánh này có .loi
    default:
      return khongBaoGioToiDay(state);
  }
}
```

**Tại sao mẫu này mạnh:** nó làm cho **trạng thái sai trở thành không thể biểu diễn được**. So sánh với cách viết thường gặp:

```ts
// ❌ Cách hay gặp — cho phép nhiều trạng thái vô lý
interface State {
  dangTai: boolean;
  duLieu?: SanPham;
  loi?: string;
}
// dangTai: true VÀ có loi VÀ có duLieu cùng lúc? Type vẫn cho qua.
// Quên check dangTai rồi đọc duLieu? Type vẫn cho qua.
```

Với discriminated union, những tổ hợp vô lý đó **không compile được ngay từ đầu**.

### Exhaustiveness check — phần thưởng lớn nhất

```ts
function khongBaoGioToiDay(x: never): never {
  throw new Error('Truong hop chua duoc xu ly: ' + JSON.stringify(x));
}
```

Ở nhánh `default`, TS đã loại hết mọi case đã xử lý, nên `state` còn lại kiểu `never` — gán vào tham số `never` thì hợp lệ.

Nhưng khi anh **thêm một nhánh mới** vào `TrangThaiTai` mà quên xử lý, `state` ở `default` không còn là `never` nữa, và TS báo lỗi ngay:

```
error TS2345: Argument of type '{ trangThai: "timeout"; giay: number; }'
is not assignable to parameter of type 'never'.
```

Compiler tự chỉ cho anh **mọi chỗ cần sửa** khi mở rộng union. Đây là lý do đáng viết thêm 3 dòng `khongBaoGioToiDay`.

## 13. `satisfies` — check mà không mất type cụ thể

```ts
// Dùng `:` -> an toàn nhưng type bị "rộng" ra
const bangMau1: Record<string, string> = { do: '#f00', xanh: '#0f0' };
bangMau1.tim; // TS cho qua! Nhưng runtime là undefined 💥

// Dùng `satisfies` -> vừa check shape, vừa giữ type cụ thể
const bangMau2 = { do: '#f00', xanh: '#0f0' } satisfies Record<string, string>;
bangMau2.tim; // ❌ Error — TS biết chính xác chỉ có 'do' | 'xanh'

type KeyMau = keyof typeof bangMau2; // 'do' | 'xanh'
```

| | Kiểm tra shape | Giữ type cụ thể |
| --- | --- | --- |
| `const x: T = {...}` | ✅ | ❌ (rộng ra thành T) |
| `const x = {...} as T` | ❌ (ép, không check) | ❌ |
| `const x = {...} satisfies T` | ✅ | ✅ |

> Quy tắc: cần **suy ra type từ giá trị** (bảng config, bảng màu, danh sách route) thì dùng `satisfies`. Cần **type cố định** thì dùng `:`.

## 14. Ghép tất cả lại

Section 14 trong [advanced.ts](advanced.ts) là ví dụ thực tế nối cả chuỗi: gọi API → nhận `unknown` → validate bằng type guard → trả về discriminated union → render bằng exhaustive switch. Đó chính là luồng anh sẽ viết đi viết lại trong dự án thật.

---

## Bảng tra nhanh

| Cú pháp | Làm gì | Mục |
| --- | --- | --- |
| `keyof T` | Union các key của T | 1 |
| `typeof x` | Lấy type từ giá trị x | 2 |
| `T['key']` | Type của một field | 3 |
| `T[number]` | Type phần tử của mảng | 3 |
| `{ [K in keyof T]: ... }` | Duyệt từng key (mapped type) | 4 |
| `-?` / `-readonly` | Gỡ optional / readonly | 4 |
| `[K in keyof T as ...]` | Đổi tên hoặc lọc key | 5 |
| `` `a-${T}` `` | Ghép chuỗi ở tầng type | 6 |
| `T extends U ? X : Y` | if/else ở tầng type | 8 |
| `infer U` | Bắt type từ bên trong | 9 |
| `x is T` | Type guard (trả boolean) | 10 |
| `asserts x is T` | Assertion function (throw) | 11 |
| `x: never` | Exhaustiveness check | 12 |
| `satisfies T` | Check mà giữ type cụ thể | 13 |

## Sai lầm thường gặp

| Sai lầm | Nên làm |
| --- | --- |
| Viết type "ảo diệu" 5 tầng lồng nhau | Type khó hiểu là type sẽ bị người sau xoá. Đơn giản > thông minh |
| Type guard viết ẩu, chỉ check `typeof x === 'object'` | TS tin tuyệt đối, không kiểm tra. Check đủ field, hoặc dùng Zod |
| Dùng `as` cho nhanh khi bí | `as` là tắt type check. Bí thì thường là type đang mô tả sai |
| Quên `as const` khi rút type từ mảng | Không có nó thì chỉ ra `string`, không ra literal union |
| Union `interface` không có field phân biệt | Luôn thêm field literal (`kind`, `type`, `trangThai`) để narrow được |
| Bỏ qua exhaustiveness check | 3 dòng `khongBaoGioToiDay` đổi lấy việc compiler chỉ đúng chỗ cần sửa |

## Học tiếp

Theo lộ trình ở [doc.md — mục 6](doc.md#6-học-tiếp-gì), phần còn lại:

4. **Zod** — thay vì viết type guard tay (mục 10), khai báo schema một lần rồi `z.infer` ra type. Vừa validate runtime vừa có type.
5. **TypeScript với framework** — React (`.tsx`), Vue, Node/Express
6. **ESLint + Prettier** cho TypeScript

## Tài liệu tham khảo

- [Type Manipulation — Handbook](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Type Challenges](https://github.com/type-challenges/type-challenges) — luyện đúng những gì trong doc này, từ dễ tới khó
- [Utility Types (source)](https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts) — đọc `lib.es5.d.ts` để xem `Partial`, `Omit`, `ReturnType` viết thế nào
- [Total TypeScript — Type Transformations](https://www.totaltypescript.com/tutorials/type-transformations)
