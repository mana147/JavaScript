# TypeScript Căn Bản

_Hướng dẫn setup, chạy và tổng hợp kiến thức TypeScript cơ bản cho người đã biết JavaScript._

File thực hành: [demo.ts](demo.ts) — mỗi phần trong doc này tương ứng với một section được đánh số trong file đó.

---

## 1. TypeScript là gì ?

    TypeScript = JavaScript + Hệ thống kiểu (static type).
    Nó là superset của JS: mọi file .js hợp lệ đều là file .ts hợp lệ.

Điểm mấu chốt cần nhớ:

- Trình duyệt và Node **không hiểu** TypeScript. File `.ts` phải được **compile** (transpile) ra `.js` rồi mới chạy được.
- Type chỉ tồn tại **lúc code và lúc compile**. Sau khi build ra `.js`, toàn bộ type **bị xoá sạch** — không ảnh hưởng gì tới runtime, không làm code chạy chậm hơn.
- Lợi ích lớn nhất: bắt lỗi ngay khi gõ code thay vì lúc chạy, cộng với auto-complete cực mạnh trong VSCode.

Ví dụ so sánh:

```js
// JavaScript — chạy bình thường, ra "NaN", không ai báo gì cả
function cong(a, b) {
  return a + b;
}
cong(2, 'ba'); // => "2ba"  😱
```

```ts
// TypeScript — báo lỗi ngay trong editor, chưa cần chạy
function cong(a: number, b: number): number {
  return a + b;
}
cong(2, 'ba'); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'
```

---

## 2. Cách setup

### 2.1. Yêu cầu

Chỉ cần Node.js (đã có sẵn nếu bạn đang làm JS):

```bash
node -v      # nên từ v18 trở lên
npm -v
```

### 2.2. Khởi tạo project

Đứng tại thư mục `ts-basic`:

```bash
cd ts-basic
npm init -y
```

### 2.3. Cài TypeScript

**Nên cài local (trong project)** thay vì global, để mỗi project khoá được một phiên bản riêng:

```bash
npm install --save-dev typescript
```

Cài thêm type definition cho Node (để dùng `console`, `setTimeout`, `process`... mà không báo lỗi):

```bash
npm install --save-dev @types/node
```

Cài `tsx` để chạy thẳng file `.ts` không cần build (rất tiện lúc học):

```bash
npm install --save-dev tsx
```

Kiểm tra:

```bash
npx tsc --version
```

> Lưu ý: `npx` chạy bản typescript trong `node_modules` của project. Nếu cài global thì dùng `tsc` trực tiếp:
> `npm install -g typescript`

### 2.4. Tạo file cấu hình tsconfig.json

```bash
npx tsc --init
```

Lệnh trên sinh ra file `tsconfig.json` với rất nhiều option bị comment. Cấu hình tối giản đủ dùng để học:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Giải thích các option quan trọng:

| Option | Ý nghĩa |
| --- | --- |
| `target` | Compile ra phiên bản JS nào (ES5, ES2020, ESNext...) |
| `module` | Kiểu module output. `NodeNext` = để tsc tự theo đúng luật module của Node |
| `moduleResolution` | Cách tsc đi tìm file khi `import`. Phải khớp với `module` |
| `outDir` | Thư mục chứa file `.js` sau khi build |
| `rootDir` | Thư mục gốc chứa file `.ts` nguồn |
| `strict` | **Bật hết chế độ kiểm tra nghiêm ngặt — nên để `true`**, học đúng ngay từ đầu |
| `esModuleInterop` | Cho phép `import x from 'y'` với package CommonJS |
| `skipLibCheck` | Bỏ qua check type trong `node_modules` -> build nhanh hơn |

### 2.5. ⚠️ Quan trọng: tsconfig.json phải khớp với package.json

Đây là lỗi số 1 mà người mới gặp. Node có **2 hệ module**, và **2 file cấu hình phải nói cùng một chuyện**:

| | ESM (hiện đại) | CommonJS (cũ) |
| --- | --- | --- |
| Cú pháp | `import` / `export` | `require` / `module.exports` |
| `package.json` | `"type": "module"` | `"type": "commonjs"` |
| `tsconfig.json` | `"module": "NodeNext"` | `"module": "CommonJS"` |

Dự án này dùng **ESM**, nên `package.json` phải có:

```json
{
  "type": "module"
}
```

Nếu 2 file lệch nhau — ví dụ tsconfig build ra ESM (`export`) nhưng package.json lại khai `"type": "commonjs"` — thì lúc chạy `node dist/demo.js` sẽ gặp lỗi:

```
SyntaxError: Unexpected token 'export'
Warning: Failed to load the ES module... Make sure to set "type": "module"
```

> Lưu ý: chạy bằng `tsx` sẽ **không** lộ ra lỗi này, vì `tsx` tự xử lý được cả hai hệ. Lỗi chỉ xuất hiện khi build ra JS rồi chạy bằng `node`. Nên thỉnh thoảng anh nhớ test bằng `npm run build && node dist/demo.js`.

**Đừng dùng `"moduleResolution": "bundler"`** trừ khi anh dùng bundler (Vite, Webpack, esbuild). Chạy trực tiếp bằng Node thì luôn là `NodeNext`.

`strict: true` thực chất bật một loạt cờ con, trong đó 2 cờ hay gặp nhất:

- `strictNullChecks`: `null` / `undefined` không tự động gán được vào mọi kiểu -> ép bạn xử lý trường hợp rỗng.
- `noImplicitAny`: không cho phép biến/tham số bị suy ra kiểu `any` một cách âm thầm.

---

## 3. Cách chạy

Có 3 cách, chọn theo tình huống:

### Cách 1 — `tsx`: chạy thẳng, không sinh file (khuyên dùng khi học)

```bash
npx tsx demo.ts
```

Chạy lại tự động mỗi khi lưu file (watch mode):

```bash
npx tsx watch demo.ts
```

### Cách 2 — `tsc`: build ra JS rồi chạy (giống môi trường production)

```bash
npx tsc              # compile toàn bộ .ts theo tsconfig.json -> ./dist
node dist/demo.js    # chạy file JS vừa sinh ra
```

Compile một file lẻ, không cần tsconfig:

```bash
npx tsc demo.ts      # sinh ra demo.js ngay cạnh
```

Vừa compile vừa theo dõi thay đổi:

```bash
npx tsc --watch
```

### Cách 3 — chỉ kiểm tra lỗi, không sinh file

Rất hay dùng trong CI hoặc trước khi commit:

```bash
npx tsc --noEmit
```

### Thêm script cho gọn

Trong `package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch demo.ts",
    "start": "tsx demo.ts",
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  }
}
```

Rồi chỉ cần:

```bash
npm run start
npm run build
npm run typecheck
```

### Nhớ thêm vào .gitignore

```
node_modules/
dist/
*.js.map
```

---

## 4. Kiến thức căn bản

### 4.1. Kiểu cơ bản & Type inference

```ts
let hoTen: string = 'Hieu Pham';
let tuoi: number = 28;
let dangDiLam: boolean = true;
```

Nhưng thường **không cần ghi kiểu** — TS tự suy ra (type inference):

```ts
let ngheNghiep = 'Developer'; // TS tự hiểu là string
ngheNghiep = 123; // ❌ Error
```

> Quy tắc thực tế: chỉ ghi kiểu tường minh cho **tham số hàm** và **giá trị trả về**. Còn biến local thì để TS tự suy.

### 4.2. Array & Tuple

```ts
let diemSo: number[] = [8, 9, 10]; // cách 1
let monHoc: Array<string> = ['Toan']; // cách 2, tương đương
let honHop: (string | number)[] = ['a', 1]; // mảng nhiều kiểu

// Tuple: cố định số lượng và kiểu từng vị trí
let toaDo: [number, number] = [10.5, 20.3];
```

### 4.3. any / unknown / void / never

| Kiểu | Ý nghĩa | Khi nào dùng |
| --- | --- | --- |
| `any` | Tắt hoàn toàn type check | **Hạn chế tối đa** — dùng `any` là mất hết lợi ích của TS |
| `unknown` | Chưa biết kiểu, phải check trước khi dùng | Dữ liệu từ API, `JSON.parse`, input bên ngoài |
| `void` | Hàm không trả về gì | Hàm chỉ làm side-effect (log, set state...) |
| `never` | Không bao giờ trả về | Hàm luôn `throw`, hoặc loop vô tận |

```ts
let giaTriLa: unknown = 'toi la chuoi';
giaTriLa.toUpperCase(); // ❌ Error: 'giaTriLa' is of type 'unknown'

if (typeof giaTriLa === 'string') {
  giaTriLa.toUpperCase(); // ✅ OK — đã narrow về string
}
```

### 4.4. Union & Literal type

```ts
let id: string | number; // union: 1 trong 2 kiểu

// Literal: chỉ nhận đúng các giá trị được liệt kê
type TrangThai = 'pending' | 'success' | 'error';
let trangThaiDon: TrangThai = 'pending';
trangThaiDon = 'done'; // ❌ Error
```

> Literal union là thứ dùng nhiều nhất trong dự án thật (status, role, size, variant...). Nó thay thế cho `enum` trong hầu hết trường hợp và gọn hơn.

### 4.5. Interface & Type alias

```ts
interface SanPham {
  readonly id: number; // không sửa được sau khi khởi tạo
  ten: string;
  gia: number;
  moTa?: string; // optional — có hoặc không đều được
}
```

**Khác nhau giữa `interface` và `type`:**

| | `interface` | `type` |
| --- | --- | --- |
| Mô tả object | ✅ | ✅ |
| Kế thừa | `extends` | dùng `&` (intersection) |
| Union / tuple / primitive | ❌ | ✅ |
| Khai báo trùng tên tự gộp lại | ✅ | ❌ |

> Quy ước phổ biến: **object và class dùng `interface`, còn lại (union, tuple, alias) dùng `type`**. Không có lựa chọn nào sai, quan trọng là nhất quán trong project.

### 4.6. Function

```ts
// optional (?) và giá trị mặc định
function chaoHoi(ten: string, loiChao = 'Xin chao', hauTo?: string): string {
  return `${loiChao}, ${ten}${hauTo ? ' ' + hauTo : ''}!`;
}

// rest parameter
function tongTatCa(...soList: number[]): number {
  return soList.reduce((tong, so) => tong + so, 0);
}

// định nghĩa kiểu cho hàm — rất hay dùng cho callback
type XuLyChuoi = (input: string) => string;
const vietHoa: XuLyChuoi = (input) => input.toUpperCase();
```

> Lưu ý: tham số optional `?` phải luôn nằm **sau** tham số bắt buộc.

### 4.7. Generics

Generic = "kiểu truyền vào như tham số", giúp viết một hàm dùng được cho nhiều kiểu mà **không mất type**:

```ts
function layPhanTuDau<T>(arr: T[]): T | undefined {
  return arr[0];
}

layPhanTuDau([1, 2, 3]); // TS hiểu: number | undefined
layPhanTuDau(['a', 'b']); // TS hiểu: string | undefined
```

Mẫu hay gặp nhất trong thực tế — kiểu response API:

```ts
interface ApiResponse<TData> {
  status: number;
  message: string;
  data: TData;
}

const res: ApiResponse<SanPham> = { status: 200, message: 'OK', data: laptop };
const list: ApiResponse<SanPham[]> = { status: 200, message: 'OK', data: [laptop] };
```

Ràng buộc generic bằng `extends`:

```ts
// T bắt buộc phải có thuộc tính length
function doDai<T extends { length: number }>(item: T): number {
  return item.length;
}
```

### 4.8. Class

```ts
class TaiKhoan {
  public tenDangNhap: string; // mặc định, ai cũng truy cập được
  private matKhau: string; // chỉ trong class này
  protected vaiTro: string; // trong class này và class con
  readonly ngayTao: Date; // chỉ đọc

  constructor(tenDangNhap: string, matKhau: string, vaiTro = 'user') {
    this.tenDangNhap = tenDangNhap;
    this.matKhau = matKhau;
    this.vaiTro = vaiTro;
    this.ngayTao = new Date();
  }

  get thongTin(): string {
    return `${this.tenDangNhap} (${this.vaiTro})`;
  }
}
```

Viết tắt: khai báo access modifier ngay trong constructor, TS tự gán vào `this`:

```ts
class Cho implements CoTheKeu {
  constructor(public ten: string) {} // tương đương this.ten = ten
  keu(): string {
    return `${this.ten}: Gau gau!`;
  }
}
```

`implements` = cam kết class tuân theo đúng "hợp đồng" mà interface đặt ra.

### 4.9. Narrowing (thu hẹp kiểu)

Khi một biến có kiểu union, TS chỉ cho dùng những gì **chung** của cả union. Muốn dùng method riêng thì phải narrow trước:

```ts
function inThongTin(giaTri: string | number | Date): string {
  if (typeof giaTri === 'string') return giaTri.toUpperCase(); // chắc chắn string
  if (typeof giaTri === 'number') return giaTri.toFixed(2); // chắc chắn number
  return giaTri.toISOString(); // còn lại chỉ có thể là Date
}
```

Các cách narrow thường dùng: `typeof`, `instanceof`, `in`, so sánh literal (`===`), và check `if (x)` để loại `null`/`undefined`.

### 4.10. Utility Types

TS có sẵn một loạt type tiện ích, đây là những cái dùng nhiều nhất:

```ts
Partial<SanPham>              // tất cả field thành optional  -> dùng cho hàm update
Required<SanPham>             // ngược lại, bắt buộc hết
Readonly<SanPham>             // tất cả field thành readonly
Pick<SanPham, 'id' | 'ten'>   // chỉ lấy vài field
Omit<SanPham, 'id'>           // bỏ đi vài field       -> dùng cho payload tạo mới
Record<string, number>        // object key string, value number
ReturnType<typeof cong>       // lấy kiểu trả về của hàm  -> number
```

### 4.11. Async / Await có kiểu

Hàm `async` **luôn** trả về `Promise<T>`:

```ts
async function layDuLieu(id: number): Promise<ApiResponse<SanPham>> {
  const res = await fetch(`/api/san-pham/${id}`);
  return res.json();
}

const res = await layDuLieu(99);
res.data.ten; // ✅ TS gợi ý đầy đủ các field
```

### 4.12. Module

Một file `.ts` có `import` hoặc `export` mới được coi là module (biến không bị lọt ra global):

```ts
export { cong, TaiKhoan };
export type { SanPham, ApiResponse }; // export riêng type — bị xoá hoàn toàn khi build
```

---

## 5. Những lỗi hay gặp khi mới học

| Lỗi | Nguyên nhân & cách xử lý |
| --- | --- |
| `Cannot find name 'console'` | Chưa cài `@types/node` -> `npm i -D @types/node` |
| `Object is possibly 'null'` | Do `strictNullChecks`. Check `if (x)` trước, hoặc dùng optional chaining `x?.ten` |
| `Parameter 'x' implicitly has an 'any' type` | Do `noImplicitAny`. Ghi kiểu tường minh cho tham số |
| `Cannot redeclare block-scoped variable` | 2 file `.ts` cùng khai báo tên biến ở global. Thêm `export {}` vào cuối file để biến nó thành module |
| `Type 'string' is not assignable to type 'number'` | Gán sai kiểu — đọc kỹ, đây chính là lúc TS đang giúp bạn |

> Mẹo: khi bí, tạm dùng `as` để ép kiểu (`giaTri as string`), nhưng hiểu rằng đó là **bạn cam kết với compiler**, TS sẽ không kiểm tra nữa. Lạm dụng `as` và `any` là cách nhanh nhất để mất hết lợi ích của TypeScript.

---

## 6. Học tiếp gì

Sau khi nắm phần trên, hướng đi tiếp theo:

✅ **Mục 1–3 đã có bài học riêng: [advanced.md](advanced.md) + [advanced.ts](advanced.ts)** — chạy bằng `npx tsx advanced.ts`

1. ✅ **Type nâng cao** — mapped types, conditional types, template literal types, `keyof` / `typeof` / `infer`
2. ✅ **Type guard tự viết** — `function laSanPham(x: unknown): x is SanPham`
3. ✅ **Discriminated union** — mẫu xử lý state (loading / success / error) cực mạnh
4. ⬜ **Zod** — validate dữ liệu runtime và tự sinh type từ schema
5. ⬜ **TypeScript với framework** — React (`.tsx`), Vue, Node/Express
6. ⬜ **ESLint + Prettier** cho TypeScript

## 7. Tài liệu tham khảo

- [TypeScript Handbook (chính thức)](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) — code TS ngay trên trình duyệt, xem JS output realtime
- [TS Config Reference](https://www.typescriptlang.org/tsconfig) — tra cứu mọi option trong tsconfig.json
- [Type Challenges](https://github.com/type-challenges/type-challenges) — bài tập luyện type từ dễ đến khó
- [Total TypeScript](https://www.totaltypescript.com/tutorials) — tutorial miễn phí chất lượng cao
