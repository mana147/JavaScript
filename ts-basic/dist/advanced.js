/**
 * DEMO TYPESCRIPT NÂNG CAO
 * ------------------------
 * Học sau khi đã nắm demo.ts
 *
 * Chạy nhanh:  npx tsx advanced.ts
 * Hoặc build:  npx tsc && node dist/advanced.js
 *
 * Xem giải thích chi tiết trong file advanced.md
 */
const laptop = { id: 1, ten: 'Dell Vostro', gia: 12000000, tonKho: true };
const cacKey = ['id', 'ten', 'gia', 'tonKho'];
// const sai: KeySanPham = 'mauSac';   // ❌ Error: không có key này
// Ứng dụng kinh điển: hàm lấy field an toàn.
// K bị ràng buộc phải là key của T, và trả về đúng kiểu của field đó.
function layField(obj, key) {
    return obj[key];
}
const ten = layField(laptop, 'ten'); // TS hiểu: string
const gia = layField(laptop, 'gia'); // TS hiểu: number
// layField(laptop, 'mauSac');        // ❌ Error: 'mauSac' không phải key của SanPham
console.log('--- 1. keyof ---');
console.log(cacKey, '|', ten, '|', gia);
// =====================================================================
// 2. typeof — lấy TYPE từ một GIÁ TRỊ đã có
// =====================================================================
// Lưu ý: đây là `typeof` ở tầng TYPE, khác với `typeof` lúc runtime trong JS
const cauHinhMacDinh = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    debug: false,
};
// => { apiUrl: string; timeout: number; debug: boolean }
const cauHinhTest = {
    apiUrl: 'http://localhost:3000',
    timeout: 1000,
    debug: true,
};
console.log('--- 2. typeof ---');
console.log(cauHinhTest.apiUrl, '|', cauHinhTest.timeout);
// Lấy kiểu phần tử của một mảng bằng [number]
const danhSachMau = ['do', 'xanh', 'vang'];
const mauChon = 'xanh';
// const mauSai: Mau = 'tim';   // ❌ Error
console.log('--- 3. Indexed Access ---');
console.log(mauChon, '|', danhSachMau.join(', '));
const loiForm = {
    ten: 'Ten khong duoc de trong',
    gia: 'Gia phai lon hon 0',
};
const sanPhamMoi = { ten: 'Chuot khong day' };
console.log('--- 4. Mapped Types ---');
console.log(loiForm, '|', sanPhamMoi);
const spKhongId = { ten: 'Ban phim', gia: 500000, tonKho: true };
console.log('--- 5. Key Remapping ---');
console.log(spKhongId);
// => 'btn-primary-sm' | 'btn-primary-md' | ... | 'btn-danger-lg'
const classNut = 'btn-primary-lg';
const tenHandler = 'onClick';
console.log('--- 6. Template Literal ---');
console.log(classNut, '|', tenHandler);
// Getters<SanPham> tương đương với:
// { getId: () => number; getTen: () => string; getGia: () => number; getTonKho: () => boolean }
const sanPhamGetters = {
    getId: () => laptop.id,
    getTen: () => laptop.ten,
    getGia: () => laptop.gia,
    getTonKho: () => laptop.tonKho,
};
console.log('--- 7. Mapped + Template ---');
console.log(sanPhamGetters.getTen(), '|', sanPhamGetters.getGia());
// Conditional type PHÂN PHỐI qua union một cách tự động.
// BoRong<string | null> được TS tính từng nhánh:
//   BoRong<string> | BoRong<null>  =>  string | never  =>  string
const chuoiChacChan = 'khong bao gio null';
const kq1 = 'la mang';
console.log('--- 8. Conditional Types ---');
console.log(chuoiChacChan, '|', kq1);
function taoSanPham(ten, gia) {
    return { id: Date.now(), ten, gia, tonKho: true };
}
const phanTu = 'toi la phan tu cua string[]';
const spTao = taoSanPham('Man hinh', 3000000);
console.log('--- 9. infer ---');
console.log(phanTu, '|', spTao.ten, spTao.gia);
// =====================================================================
// 10. TYPE GUARD TỰ VIẾT — dạy TS cách nhận biết kiểu
// =====================================================================
// Vấn đề: dữ liệu từ API về là `unknown`, TS không cho đụng vào.
// Giải pháp: viết hàm trả về `x is T` — gọi là type predicate.
// Nếu hàm trả true, TS TIN rằng x có kiểu T trong nhánh đó.
function laSanPham(x) {
    return (typeof x === 'object' &&
        x !== null &&
        'id' in x &&
        'ten' in x &&
        typeof x.id === 'number' &&
        typeof x.ten === 'string');
}
function xuLyDuLieuApi(duLieu) {
    if (laSanPham(duLieu)) {
        // trong block này TS đã coi duLieu là SanPham, gợi ý đầy đủ .ten, .gia
        return `San pham hop le: ${duLieu.ten} - ${duLieu.gia}`;
    }
    return 'Du lieu khong dung dinh dang san pham';
}
// Type guard cho mảng
function laMangSanPham(x) {
    return Array.isArray(x) && x.every(laSanPham);
}
console.log('--- 10. Type Guard ---');
console.log(xuLyDuLieuApi(laptop));
console.log(xuLyDuLieuApi({ linh: 'tinh' }));
console.log('La mang san pham?', laMangSanPham([laptop, laptop]));
// =====================================================================
// 11. ASSERTION FUNCTION — `asserts x is T`
// =====================================================================
// Khác type guard: không trả về boolean mà THROW nếu sai.
// Sau khi gọi xong, TS coi như biến đã đúng kiểu ở TOÀN BỘ phần còn lại.
function khangDinhLaSanPham(x) {
    if (!laSanPham(x)) {
        throw new Error('Du lieu khong phai SanPham');
    }
}
function inTenSanPham(duLieu) {
    khangDinhLaSanPham(duLieu);
    // từ dòng này trở đi TS coi duLieu là SanPham, không cần bọc if
    return duLieu.ten;
}
console.log('--- 11. Assertion Function ---');
console.log(inTenSanPham(laptop));
try {
    inTenSanPham('chuoi lung tung');
}
catch (err) {
    // trong catch, err có kiểu unknown -> phải narrow trước khi dùng
    console.log('Bat duoc loi:', err instanceof Error ? err.message : 'khong ro');
}
function hienThi(state) {
    switch (state.trangThai) {
        case 'idle':
            return 'Chua tai gi ca';
        case 'loading':
            return 'Dang tai...';
        case 'success':
            // chỉ nhánh này mới có .duLieu, TS biết điều đó
            return `Da tai xong: ${state.duLieu.ten}`;
        case 'error':
            // chỉ nhánh này mới có .loi
            return `Loi: ${state.loi}`;
        default:
            return khongBaoGioToiDay(state);
    }
}
// Exhaustiveness check: nếu sau này thêm nhánh mới vào TrangThaiTai
// mà quên xử lý, TS sẽ báo lỗi NGAY tại dòng này. Rất đáng để viết.
function khongBaoGioToiDay(x) {
    throw new Error('Truong hop chua duoc xu ly: ' + JSON.stringify(x));
}
console.log('--- 12. Discriminated Union ---');
console.log(hienThi({ trangThai: 'idle' }));
console.log(hienThi({ trangThai: 'loading' }));
console.log(hienThi({ trangThai: 'success', duLieu: laptop }));
console.log(hienThi({ trangThai: 'error', loi: 'Mat ket noi' }));
// =====================================================================
// 13. satisfies — kiểm tra mà KHÔNG làm mất type cụ thể
// =====================================================================
// Dùng `:` -> an toàn nhưng type bị "rộng" ra
const bangMau1 = { do: '#f00', xanh: '#0f0' };
// bangMau1.tim  -> TS cho qua vì key là string bất kỳ, nhưng runtime là undefined!
// Dùng `satisfies` -> vừa check đúng shape, vừa giữ nguyên type cụ thể
const bangMau2 = {
    do: '#f00',
    xanh: '#0f0',
};
const keyMau = 'do';
console.log('--- 13. satisfies ---');
console.log(bangMau1.do, '|', bangMau2.xanh, '|', keyMau);
// =====================================================================
// 14. GHÉP TẤT CẢ LẠI — ví dụ thực tế
// =====================================================================
// Giả lập gọi API có kiểu chặt chẽ từ đầu tới cuối
async function taiSanPham(id) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 50));
        // giả lập response thô, kiểu unknown như đời thật
        const thoDuLieu = { id, ten: 'San pham ' + id, gia: 99000, tonKho: true };
        // validate trước khi tin
        if (!laSanPham(thoDuLieu)) {
            return { trangThai: 'error', loi: 'Response sai dinh dang' };
        }
        return { trangThai: 'success', duLieu: thoDuLieu };
    }
    catch {
        return { trangThai: 'error', loi: 'Loi mang' };
    }
}
async function main() {
    console.log('--- 14. Ghep tat ca ---');
    console.log(hienThi(await taiSanPham(7)));
}
main();
export { layField, laSanPham, khangDinhLaSanPham, hienThi, taiSanPham };
