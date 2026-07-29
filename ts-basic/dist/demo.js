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
let hoTen = 'Hieu Pham';
let tuoi = 28;
let dangDiLam = true;
// Type inference: TS tự suy ra kiểu, không cần ghi ": string"
let ngheNghiep = 'Developer'; // TS hiểu ngheNghiep là string
// ngheNghiep = 123;          // ❌ Error: Type 'number' is not assignable to type 'string'
// null & undefined
let chuaCoGiaTri = null;
let khongXacDinh = undefined;
console.log('--- 1. Primitive ---');
console.log(hoTen, tuoi, dangDiLam, ngheNghiep, chuaCoGiaTri, khongXacDinh);
// =====================================================================
// 2. ARRAY & TUPLE
// =====================================================================
// Mảng: 2 cách viết đều giống nhau
let diemSo = [8, 9, 10];
let monHoc = ['Toan', 'Ly', 'Hoa'];
// Mảng nhiều kiểu (union)
let honHop = ['a', 1, 'b', 2];
// Tuple: mảng CỐ ĐỊNH số phần tử và kiểu từng vị trí
let toaDo = [10.5, 20.3];
let nguoiDung = ['Hieu', 28, true];
// toaDo = [10.5, 'abc'];   // ❌ Error: vị trí thứ 2 phải là number
console.log('--- 2. Array & Tuple ---');
console.log(diemSo, monHoc, honHop, toaDo, nguoiDung);
// =====================================================================
// 3. ANY / UNKNOWN / NEVER / VOID
// =====================================================================
// any: tắt hoàn toàn type check -> HẠN CHẾ DÙNG
let batKyThu = 'chuoi';
let sobatky = 123;
batKyThu = 999; // OK, không báo lỗi
// unknown: an toàn hơn any, PHẢI kiểm tra kiểu trước khi dùng
let giaTriLa = 'toi la chuoi';
// console.log(giaTriLa.toUpperCase());  // ❌ Error: 'giaTriLa' is of type 'unknown'
if (typeof giaTriLa === 'string') {
    console.log('--- 3. unknown sau khi narrow ---');
    console.log(giaTriLa.toUpperCase()); // ✅ OK, trong block này TS biết là string
}
// void: hàm không trả về gì
function inLog(msg) {
    console.log('[LOG]', msg);
}
// never: hàm không bao giờ chạy xong (throw hoặc vòng lặp vô tận)
function baoLoi(msg) {
    throw new Error(msg);
}
inLog('Ham void chay xong');
// =====================================================================
// 4. UNION & LITERAL TYPE
// =====================================================================
// Union: biến có thể là 1 trong nhiều kiểu
let id;
id = 'SV001';
id = 1;
let trangThaiDon = 'pending';
// trangThaiDon = 'done';   // ❌ Error: chỉ nhận 'pending' | 'success' | 'error'
function xuLyTrangThai(t) {
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
const laptop = {
    id: 1,
    ten: 'Dell Vostro 5460',
    gia: 12000000,
    // moTa bỏ trống vẫn hợp lệ vì là optional
};
const laptopSale = {
    id: 2,
    ten: 'Macbook Air M2',
    gia: 25000000,
    phanTramGiam: 10,
};
const diemA = { x: 1, y: 2 };
const ketQua = null;
console.log('--- 5. Interface & Type ---');
console.log(laptop, laptopSale, diemA, ketQua);
// =====================================================================
// 6. FUNCTION
// =====================================================================
// Tham số và giá trị trả về đều có kiểu
function cong(a, b) {
    return a + b;
}
// Tham số optional (?) và tham số mặc định
function chaoHoi(ten, loiChao = 'Xin chao', hauTo) {
    return `${loiChao}, ${ten}${hauTo ? ' ' + hauTo : ''}!`;
}
// Rest parameter
function tongTatCa(...soList) {
    return soList.reduce((tong, so) => tong + so, 0);
}
// Arrow function + function type
const nhan = (a, b) => a * b;
const vietHoa = (input) => input.toUpperCase();
console.log('--- 6. Function ---');
console.log(cong(2, 3), chaoHoi('Hieu'), chaoHoi('Hieu', 'Hello', 'nhe'));
console.log(tongTatCa(1, 2, 3, 4, 5), nhan(4, 5), vietHoa('typescript'));
// =====================================================================
// 7. GENERICS — viết code dùng lại được cho nhiều kiểu
// =====================================================================
// Không dùng generic: phải viết riêng cho từng kiểu, hoặc dùng any (mất type)
// Dùng generic: T là "kiểu tham số", TS tự suy ra khi gọi
function layPhanTuDau(arr) {
    return arr[0];
}
const soDau = layPhanTuDau([1, 2, 3]); // TS hiểu: number | undefined
const chuDau = layPhanTuDau(['a', 'b']); // TS hiểu: string | undefined
const resSanPham = {
    status: 200,
    message: 'OK',
    data: laptop,
};
const resDanhSach = {
    status: 200,
    message: 'OK',
    data: [laptop, laptopSale],
};
// Generic constraint: T phải có thuộc tính length
function doDai(item) {
    return item.length;
}
console.log('--- 7. Generics ---');
console.log(soDau, chuDau, resSanPham.data.ten, resDanhSach.data.length);
console.log(doDai('chuoi co 15 ky tu'), doDai([1, 2, 3]));
// =====================================================================
// 8. CLASS
// =====================================================================
class TaiKhoan {
    constructor(tenDangNhap, matKhau, vaiTro = 'user') {
        this.tenDangNhap = tenDangNhap;
        this.matKhau = matKhau;
        this.vaiTro = vaiTro;
        this.ngayTao = new Date();
    }
    // Method
    kiemTraMatKhau(input) {
        return this.matKhau === input;
    }
    // Getter
    get thongTin() {
        return `${this.tenDangNhap} (${this.vaiTro})`;
    }
}
// Kế thừa
class QuanTri extends TaiKhoan {
    constructor(tenDangNhap, matKhau) {
        super(tenDangNhap, matKhau, 'admin');
    }
    xoaNguoiDung(ten) {
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
class Cho {
    constructor(ten) {
        this.ten = ten;
    } // shorthand: tự gán this.ten = ten
    keu() {
        return `${this.ten}: Gau gau!`;
    }
}
console.log('--- 9. Implements ---');
console.log(new Cho('Milu').keu());
// =====================================================================
// 10. NARROWING — thu hẹp kiểu để dùng an toàn
// =====================================================================
function inThongTin(giaTri) {
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
const capNhat = { gia: 11000000 }; // chỉ cần truyền field muốn sửa
const rutGon = { id: 1, ten: 'Laptop' };
const spMoi = { ten: 'Chuot khong day', gia: 350000 };
const bangGia = { laptop: 12000000, chuot: 350000 };
console.log('--- 11. Utility Types ---');
console.log(capNhat, rutGon, spMoi, bangGia);
// =====================================================================
// 12. ASYNC / AWAIT CÓ KIỂU
// =====================================================================
// Hàm async luôn trả về Promise<T>
async function layDuLieu(id) {
    // giả lập gọi API
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
        status: 200,
        message: 'OK',
        data: { id, ten: 'San pham ' + id, gia: 100000 },
    };
}
async function main() {
    const res = await layDuLieu(99);
    console.log('--- 12. Async/Await ---');
    console.log(res.data.ten, '-', res.data.gia); // TS gợi ý đầy đủ .ten, .gia
}
main();
// Bắt buộc phải có export/import thì file mới được coi là module
// (tránh lỗi trùng tên biến toàn cục khi có nhiều file .ts)
export { cong, layPhanTuDau, TaiKhoan };
