/**
 * DEMO TYPESCRIPT CĂN BẢN
 * -----------------------
 * Chạy nhanh:  npx tsx demo.ts
 * Hoặc build:  npx tsc && node dist/demo.js
 *
 * Xem giải thích chi tiết trong file doc.md
 */

// =====================================================================
// 1. KIỂU DỮ LIỆU CƠ BẢN (Primitive types)
// =====================================================================

// Khai báo tường minh: <tên biến>: <kiểu>
let hoTen: string = 'Hieu Pham';
let tuoi: number = 28;
let dangDiLam: boolean = true;

// Type inference: TS tự suy ra kiểu, không cần ghi ": string"
let ngheNghiep = 'Developer'; // TS hiểu ngheNghiep là string
// ngheNghiep = 123;          // ❌ Error: Type 'number' is not assignable to type 'string'

// null & undefined
let chuaCoGiaTri: string | null = null;
let khongXacDinh: number | undefined = undefined;

console.log('--- 1. Primitive ---');
console.log(hoTen, tuoi, dangDiLam, ngheNghiep, chuaCoGiaTri, khongXacDinh);

// =====================================================================
// 2. ARRAY & TUPLE
// =====================================================================

// Mảng: 2 cách viết đều giống nhau
let diemSo: number[] = [8, 9, 10];
let monHoc: Array<string> = ['Toan', 'Ly', 'Hoa'];

// Mảng nhiều kiểu (union)
let honHop: (string | number)[] = ['a', 1, 'b', 2];

// Tuple: mảng CỐ ĐỊNH số phần tử và kiểu từng vị trí
let toaDo: [number, number] = [10.5, 20.3];
let nguoiDung: [string, number, boolean] = ['Hieu', 28, true];
// toaDo = [10.5, 'abc'];   // ❌ Error: vị trí thứ 2 phải là number

console.log('--- 2. Array & Tuple ---');
console.log(diemSo, monHoc, honHop, toaDo, nguoiDung);

// =====================================================================
// 3. ANY / UNKNOWN / NEVER / VOID
// =====================================================================

// any: tắt hoàn toàn type check -> HẠN CHẾ DÙNG
let batKyThu: any = 'chuoi';
let sobatky: any = 123;
batKyThu = 999; // OK, không báo lỗi

// unknown: an toàn hơn any, PHẢI kiểm tra kiểu trước khi dùng
let giaTriLa: unknown = 'toi la chuoi';
// console.log(giaTriLa.toUpperCase());  // ❌ Error: 'giaTriLa' is of type 'unknown'
if (typeof giaTriLa === 'string') {
  console.log('--- 3. unknown sau khi narrow ---');
  console.log(giaTriLa.toUpperCase()); // ✅ OK, trong block này TS biết là string
}

// void: hàm không trả về gì
function inLog(msg: string): void {
  console.log('[LOG]', msg);
}

// never: hàm không bao giờ chạy xong (throw hoặc vòng lặp vô tận)
function baoLoi(msg: string): never {
  throw new Error(msg);
}

inLog('Ham void chay xong');

// =====================================================================
// 4. UNION & LITERAL TYPE
// =====================================================================

// Union: biến có thể là 1 trong nhiều kiểu
let id: string | number;
id = 'SV001';
id = 1;

// Literal type: chỉ được nhận đúng các giá trị liệt kê -> rất hay dùng
type TrangThai = 'pending' | 'success' | 'error';
let trangThaiDon: TrangThai = 'pending';
// trangThaiDon = 'done';   // ❌ Error: chỉ nhận 'pending' | 'success' | 'error'

function xuLyTrangThai(t: TrangThai): string {
  switch (t) {
    case 'pending':
      return 'Dang xu ly...';
    case 'success':
      return 'Thanh cong!';
    case 'error':
      return 'That bai!';
  }
}

console.log('--- 4. Union & Literal ---');
console.log(id, xuLyTrangThai(trangThaiDon), xuLyTrangThai('success'));

// =====================================================================
// 5. INTERFACE & TYPE ALIAS
// =====================================================================

interface SanPham {
  readonly id: number; // readonly: không sửa được sau khi khởi tạo
  ten: string;
  gia: number;
  moTa?: string; // dấu ? = optional, có cũng được không có cũng được
}

const laptop: SanPham = {
  id: 1,
  ten: 'Dell Vostro 5460',
  gia: 12000000,
  // moTa bỏ trống vẫn hợp lệ vì là optional
};
// laptop.id = 2;   // ❌ Error: Cannot assign to 'id' because it is a read-only property

// Interface có thể extends (kế thừa)
interface SanPhamKhuyenMai extends SanPham {
  phanTramGiam: number;
}

const laptopSale: SanPhamKhuyenMai = {
  id: 2,
  ten: 'Macbook Air M2',
  gia: 25000000,
  phanTramGiam: 10,
};

// Type alias: làm được gần như interface, thêm được union / tuple / primitive
type Diem = { x: number; y: number };
type KetQua = Diem | null;

const diemA: Diem = { x: 1, y: 2 };
const ketQua: KetQua = null;

console.log('--- 5. Interface & Type ---');
console.log(laptop, laptopSale, diemA, ketQua);

// =====================================================================
// 6. FUNCTION
// =====================================================================

// Tham số và giá trị trả về đều có kiểu
function cong(a: number, b: number): number {
  return a + b;
}

// Tham số optional (?) và tham số mặc định
function chaoHoi(ten: string, loiChao: string = 'Xin chao', hauTo?: string): string {
  return `${loiChao}, ${ten}${hauTo ? ' ' + hauTo : ''}!`;
}

// Rest parameter
function tongTatCa(...soList: number[]): number {
  return soList.reduce((tong, so) => tong + so, 0);
}

// Arrow function + function type
const nhan: (a: number, b: number) => number = (a, b) => a * b;

// Định nghĩa sẵn kiểu của một hàm (function type alias) — hay dùng cho callback
type XuLyChuoi = (input: string) => string;
const vietHoa: XuLyChuoi = (input) => input.toUpperCase();

console.log('--- 6. Function ---');
console.log(cong(2, 3), chaoHoi('Hieu'), chaoHoi('Hieu', 'Hello', 'nhe'));
console.log(tongTatCa(1, 2, 3, 4, 5), nhan(4, 5), vietHoa('typescript'));

// =====================================================================
// 7. GENERICS — viết code dùng lại được cho nhiều kiểu
// =====================================================================

// Không dùng generic: phải viết riêng cho từng kiểu, hoặc dùng any (mất type)
// Dùng generic: T là "kiểu tham số", TS tự suy ra khi gọi
function layPhanTuDau<T>(arr: T[]): T | undefined {
  return arr[0];
}

const soDau = layPhanTuDau([1, 2, 3]); // TS hiểu: number | undefined
const chuDau = layPhanTuDau(['a', 'b']); // TS hiểu: string | undefined

// Generic với interface — mẫu response API rất phổ biến
interface ApiResponse<TData> {
  status: number;
  message: string;
  data: TData;
}

const resSanPham: ApiResponse<SanPham> = {
  status: 200,
  message: 'OK',
  data: laptop,
};

const resDanhSach: ApiResponse<SanPham[]> = {
  status: 200,
  message: 'OK',
  data: [laptop, laptopSale],
};

// Generic constraint: T phải có thuộc tính length
function doDai<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log('--- 7. Generics ---');
console.log(soDau, chuDau, resSanPham.data.ten, resDanhSach.data.length);
console.log(doDai('chuoi co 15 ky tu'), doDai([1, 2, 3]));

// =====================================================================
// 8. CLASS
// =====================================================================

class TaiKhoan {
  // public: mặc định, ai cũng truy cập được
  // private: chỉ dùng trong class
  // protected: dùng trong class và class con
  public tenDangNhap: string;
  private matKhau: string;
  protected vaiTro: string;
  readonly ngayTao: Date;

  constructor(tenDangNhap: string, matKhau: string, vaiTro: string = 'user') {
    this.tenDangNhap = tenDangNhap;
    this.matKhau = matKhau;
    this.vaiTro = vaiTro;
    this.ngayTao = new Date();
  }

  // Method
  kiemTraMatKhau(input: string): boolean {
    return this.matKhau === input;
  }

  // Getter
  get thongTin(): string {
    return `${this.tenDangNhap} (${this.vaiTro})`;
  }
}

// Kế thừa
class QuanTri extends TaiKhoan {
  constructor(tenDangNhap: string, matKhau: string) {
    super(tenDangNhap, matKhau, 'admin');
  }

  xoaNguoiDung(ten: string): string {
    // truy cập được vaiTro vì nó là protected
    return `[${this.vaiTro}] Da xoa nguoi dung: ${ten}`;
  }
}

const tk = new TaiKhoan('hieupt', '123456');
const admin = new QuanTri('boss', 'secret');
// console.log(tk.matKhau);   // ❌ Error: Property 'matKhau' is private

console.log('--- 8. Class ---');
console.log(tk.thongTin, tk.kiemTraMatKhau('123456'));
console.log(admin.thongTin, admin.xoaNguoiDung('hieupt'));

// =====================================================================
// 9. IMPLEMENTS — class tuân theo interface
// =====================================================================

interface CoTheKeu {
  ten: string;
  keu(): string;
}

class Cho implements CoTheKeu {
  constructor(public ten: string) {} // shorthand: tự gán this.ten = ten

  keu(): string {
    return `${this.ten}: Gau gau!`;
  }
}

console.log('--- 9. Implements ---');
console.log(new Cho('Milu').keu());

// =====================================================================
// 10. NARROWING — thu hẹp kiểu để dùng an toàn
// =====================================================================

function inThongTin(giaTri: string | number | Date): string {
  if (typeof giaTri === 'string') {
    return `Chuoi: ${giaTri.toUpperCase()}`; // trong đây TS chắc chắn là string
  }
  if (typeof giaTri === 'number') {
    return `So: ${giaTri.toFixed(2)}`; // trong đây TS chắc chắn là number
  }
  return `Ngay: ${giaTri.toISOString()}`; // còn lại chỉ có thể là Date
}

console.log('--- 10. Narrowing ---');
console.log(inThongTin('hello'), '|', inThongTin(3.14159), '|', inThongTin(new Date(0)));

// =====================================================================
// 11. UTILITY TYPES — các type có sẵn hay dùng nhất
// =====================================================================

// Partial<T>: biến tất cả field thành optional -> dùng khi update từng phần
type CapNhatSanPham = Partial<SanPham>;
const capNhat: CapNhatSanPham = { gia: 11000000 }; // chỉ cần truyền field muốn sửa

// Required<T>: ngược lại Partial, bắt buộc hết
type SanPhamDayDu = Required<SanPham>;

// Pick<T, K>: lấy ra vài field
type SanPhamRutGon = Pick<SanPham, 'id' | 'ten'>;
const rutGon: SanPhamRutGon = { id: 1, ten: 'Laptop' };

// Omit<T, K>: bỏ đi vài field
type SanPhamMoi = Omit<SanPham, 'id'>; // tạo mới thì chưa có id
const spMoi: SanPhamMoi = { ten: 'Chuot khong day', gia: 350000 };

// Record<K, V>: object có key K, value V
type BangGia = Record<string, number>;
const bangGia: BangGia = { laptop: 12000000, chuot: 350000 };

// ReturnType<T>: lấy kiểu trả về của một hàm
type KieuTraVe = ReturnType<typeof cong>; // number

console.log('--- 11. Utility Types ---');
console.log(capNhat, rutGon, spMoi, bangGia);

// =====================================================================
// 12. ASYNC / AWAIT CÓ KIỂU
// =====================================================================

// Hàm async luôn trả về Promise<T>
async function layDuLieu(id: number): Promise<ApiResponse<SanPham>> {
  // giả lập gọi API
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    status: 200,
    message: 'OK',
    data: { id, ten: 'San pham ' + id, gia: 100000 },
  };
}

async function main(): Promise<void> {
  const res = await layDuLieu(99);
  console.log('--- 12. Async/Await ---');
  console.log(res.data.ten, '-', res.data.gia); // TS gợi ý đầy đủ .ten, .gia
}

main();

// Bắt buộc phải có export/import thì file mới được coi là module
// (tránh lỗi trùng tên biến toàn cục khi có nhiều file .ts)
export { cong, layPhanTuDau, TaiKhoan };
export type { SanPham, ApiResponse, TrangThai };
