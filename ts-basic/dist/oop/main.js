/**
 * DEMO OOP VỚI TYPESCRIPT — 4 TÍNH CHẤT
 * -------------------------------------
 * Chạy:  npx tsx oop/main.ts
 * Build: npx tsc && node dist/oop/main.js
 *
 * Xem giải thích chi tiết trong ../oop.md
 */
import { Robot } from './Robot.js';
import { RobotChienDau } from './RobotChienDau.js';
import { RobotYTe } from './RobotYTe.js';
// =====================================================================
// 1. TẠO ĐỐI TƯỢNG — class là khuôn, object là sản phẩm đúc ra
// =====================================================================
const chienBinh = new RobotChienDau('Optimus', 'SN-1234-5678', 95, 800);
const bacSi = new RobotYTe('Nightingale', 'SN-9999-4321', 'Noi tong quat');
// const robot_01 = new Robot('Robot 01', 'SN-0001'); // ❌ Không được, vì Robot là abstract class
// ❌ Không tạo object từ abstract class được:
// const r = new Robot('Chung chung', 'SN-0000');
//    Error TS2511: Cannot create an instance of an abstract class.
console.log('=== 1. TAO DOI TUONG ===');
console.log(chienBinh.khoiDong());
console.log(bacSi.khoiDong());
// =====================================================================
// 2. TÍNH ĐÓNG GÓI (Encapsulation) — che giấu và bảo vệ dữ liệu
// =====================================================================
console.log('\n=== 2. TINH DONG GOI ===');
// ✅ public: truy cập thoải mái
chienBinh.viTri = 'chien truong';
console.log('Vi tri (public):', chienBinh.viTri);
// ❌ Các mức bị chặn — bỏ comment ra sẽ thấy TS báo lỗi ngay:
// chienBinh.nangLuong = 999;   // TS2445: Property 'nangLuong' is protected
// chienBinh.maBiMat;           // TS2341: Property 'maBiMat' is private
// chienBinh.#serial;           // TS18013: Property '#serial' is not accessible
// ❌ readonly: đọc được, ghi thì không
console.log('Ten (readonly):', chienBinh.ten);
// chienBinh.ten = 'Ten khac';  // TS2540: Cannot assign to 'ten' (read-only)
// ✅ Truy cập có kiểm soát qua getter — chỉ lộ 4 số cuối
console.log('Serial (qua getter):', chienBinh.serialRutGon);
// ⭐ LÝ DO THẬT SỰ CẦN ĐÓNG GÓI: setter chặn dữ liệu vô lý ngay tại cửa
console.log('Pin ban dau:', bacSi.pin);
bacSi.pin = -50; // bị chặn
console.log('Sau khi gan -50:', bacSi.pin);
bacSi.pin = 999; // bị cắt xuống 100
console.log('Sau khi gan 999:', bacSi.pin);
bacSi.pin = 80; // hợp lệ
console.log('Sau khi gan 80:', bacSi.pin);
// =====================================================================
// 3. TÍNH KẾ THỪA (Inheritance) — dùng lại, không viết lại
// =====================================================================
console.log('\n=== 3. TINH KE THUA ===');
// khoiDong(), tieuHaoPin() và charge() KHÔNG được định nghĩa trong
// RobotChienDau, mà kế thừa nguyên từ Robot
console.log('Method ke thua tu lop cha:', chienBinh.khoiDong());
// ⭐ charge() viết MỘT lần ở lớp cha -> mọi loại robot đều dùng được
console.log('Nap pin — moi loai robot deu ke thua charge():');
chienBinh.tieuHaoPin(60); // xả bớt cho dễ thấy
console.log(chienBinh.charge(25));
console.log(bacSi.charge(15));
// Nạp quá 100 vẫn bị setter cắt trần — charge() không cần tự check lại
console.log('Nap qua muc, setter tu chan:');
console.log(chienBinh.charge(999));
// Nạp số âm bị chặn ngay đầu method
console.log(chienBinh.charge(-10));
// moTa() được override và có gọi super.moTa() -> mở rộng chứ không thay thế
console.log('moTa() da mo rong bang super:');
console.log(' ', chienBinh.moTa());
console.log(' ', bacSi.moTa());
// Quan hệ "là một" (is-a): RobotChienDau LÀ MỘT Robot
console.log('chienBinh la Robot?', chienBinh instanceof Robot);
console.log('bacSi la RobotChienDau?', bacSi instanceof RobotChienDau);
// =====================================================================
// 4. TÍNH ĐA HÌNH (Polymorphism) ⭐ — phần quan trọng nhất
// =====================================================================
console.log('\n=== 4. TINH DA HINH ===');
// Cả 2 robot đều LÀ Robot, nên gom chung được vào một mảng Robot[]
const doiRobot = [chienBinh, bacSi];
// GỌI CÙNG MỘT METHOD, mỗi object tự chạy phiên bản của mình.
// Vòng lặp này KHÔNG hề biết nó đang cầm robot loại gì.
console.log('Cung goi lamViec(), moi loai lam mot kieu:');
doiRobot.forEach((robot) => {
    console.log(' ', robot.lamViec());
});
// ⭐ Đây mới là điểm mấu chốt: thêm loại robot mới về sau,
// vòng lặp trên KHÔNG cần sửa một dòng nào.
class RobotVeSinh extends Robot {
    lamViec() {
        this.tieuHaoPin(5);
        return `🧹 [${this.ten}] Dang quet don khu vuc`;
    }
    get loai() {
        return 'Ve sinh';
    }
}
doiRobot.push(new RobotVeSinh('Rumba', 'SN-1111-2222'));
console.log('Sau khi them loai robot MOI (code tren khong doi):');
doiRobot.forEach((robot) => {
    console.log(' ', robot.lamViec());
});
// =====================================================================
// 5. TÍNH TRỪU TƯỢNG (Abstraction) — lập trình theo khuôn mẫu
// =====================================================================
console.log('\n=== 5. TINH TRUU TUONG ===');
// Hàm này nhận kiểu Robot (lớp trừu tượng), không cần biết lớp con cụ thể.
// Nó chỉ quan tâm "có lamViec() và có pin" — đúng tinh thần trừu tượng hoá.
function dieuHanhCa(dsRobot) {
    return dsRobot
        .filter((robot) => robot.pin > 20) // chỉ robot còn đủ pin
        .map((robot) => `${robot.loai}: ${robot.lamViec()}`);
}
console.log('Dieu hanh ca lam viec (loc robot con pin > 20%):');
dieuHanhCa(doiRobot).forEach((dong) => console.log(' ', dong));
// Lớp con BẮT BUỘC cài đặt method abstract, quên là lỗi compile:
// class RobotHong extends Robot {}
//    Error TS2654: Non-abstract class 'RobotHong' is missing implementations
//    for the following members of 'Robot': 'lamViec', 'loai'.
// =====================================================================
// 6. INTERFACE & IMPLEMENTS — một class, nhiều hợp đồng
// =====================================================================
console.log('\n=== 6. INTERFACE & IMPLEMENTS ===');
// RobotChienDau implements CẢ ICoTheBay LẪN ICoTheTuSua
// (extends thì chỉ được 1 lớp cha, implements thì bao nhiêu cũng được)
console.log(chienBinh.bay(300));
console.log(chienBinh.bay(9999)); // vượt trần -> bị chặn
console.log(chienBinh.tuSua());
console.log(bacSi.sac(50));
// Lập trình theo interface: hàm chỉ cần "biết bay", không cần biết là robot gì
function choBayThuNghiem(vat) {
    return vat.bay(100);
}
console.log('Ham chi quan tam ICoTheBay:', choBayThuNghiem(chienBinh).trim());
// =====================================================================
// 7. THÀNH VIÊN TĨNH (static) — thuộc về LỚP, không thuộc object
// =====================================================================
console.log('\n=== 7. STATIC ===');
// Gọi qua tên LỚP, không qua object
console.log('Tong so robot da tao:', Robot.tongSoRobot());
new RobotVeSinh('Rumba 2', 'SN-3333-4444');
console.log('Sau khi tao them 1 con:', Robot.tongSoRobot());
// chienBinh.tongSoRobot();
//    ❌ TS2576: Property 'tongSoRobot' does not exist on type 'RobotChienDau'.
//       Did you mean to access the static member 'RobotChienDau.tongSoRobot'?
// =====================================================================
// 8. instanceof + NARROWING — nối với advanced.md mục 10
// =====================================================================
console.log('\n=== 8. INSTANCEOF & NARROWING ===');
function baoCaoChiTiet(robot) {
    // Trước khi narrow, TS chỉ cho dùng những gì Robot có
    if (robot instanceof RobotChienDau) {
        // trong nhánh này TS biết chắc là RobotChienDau -> dùng được bay()
        return `${robot.ten}: robot bay duoc, tran ${robot.doCaoToiDa}m`;
    }
    if (robot instanceof RobotYTe) {
        // nhánh này thì có chuyenKhoa
        return `${robot.ten}: bac si chuyen khoa ${robot.chuyenKhoa}`;
    }
    return `${robot.ten}: robot thuong`;
}
doiRobot.forEach((robot) => console.log(' ', baoCaoChiTiet(robot)));
// Type guard tự viết dựa trên interface (interface không dùng instanceof được
// vì nó biến mất lúc runtime -> phải check theo method có tồn tại không)
function coTheBay(robot) {
    return 'bay' in robot;
}
console.log('Loc ra nhung robot biet bay:');
doiRobot.filter(coTheBay).forEach((r) => console.log('  -', r.ten));
// =====================================================================
// 9. ⚠️ private CỦA TS KHÔNG THẬT — #private mới thật
// =====================================================================
console.log('\n=== 9. private (TS) vs #private (JS) ===');
// `private maBiMat` chỉ là quy ước LÚC COMPILE. Build ra JS là bị xoá sạch,
// nên lúc chạy vẫn đọc được bình thường nếu lách qua `any`:
const lachLuat = chienBinh;
console.log('Doc private cua TS qua any:', lachLuat.maBiMat, '<- van doc duoc!');
// Còn `#serial` là private THẬT của JavaScript, runtime chặn không lách được:
console.log('Doc #serial qua any:', lachLuat.serial, '<- undefined, khong lach duoc');
console.log('Chi lay duoc qua getter:', chienBinh.serialRutGon);
console.log('=> Can bao mat that thi dung #, khong dung private cua TS');
// =====================================================================
// 10. COMPOSITION OVER INHERITANCE — đừng lạm dụng kế thừa
// =====================================================================
console.log('\n=== 10. COMPOSITION OVER INHERITANCE ===');
// ❌ Kế thừa sâu là cái bẫy kinh điển:
//    Robot -> RobotBay -> RobotBayChienDau -> RobotBayChienDauCoSung -> ...
//    Sửa lớp trên cùng là vỡ hết lớp dưới. Muốn "vừa bay vừa chữa bệnh"
//    thì kẹt, vì chỉ extends được MỘT lớp cha.
// ✅ Composition: lắp ghép năng lực từ các mảnh nhỏ độc lập
class DongCoBay {
    constructor(congSuat) {
        this.congSuat = congSuat;
    }
    kichHoat() {
        return `dong co ${this.congSuat}CV hoat dong`;
    }
}
class BoSoCuu {
    boSung() {
        return 'bo so cuu san sang';
    }
}
// Robot lai: CHỨA các bộ phận thay vì KẾ THỪA từ chúng
class RobotDaNang extends Robot {
    constructor() {
        super(...arguments);
        // "có một" (has-a) thay vì "là một" (is-a)
        this.dongCo = new DongCoBay(500);
        this.soCuu = new BoSoCuu();
    }
    lamViec() {
        return `🤖 [${this.ten}] ${this.dongCo.kichHoat()}, ${this.soCuu.boSung()}`;
    }
    get loai() {
        return 'Da nang';
    }
}
console.log(new RobotDaNang('Hybrid', 'SN-7777-8888').lamViec());
console.log('=> Ghep manh nho linh hoat hon la keo dai chuoi ke thua');
console.log('\nTong so robot da tao trong ca chuong trinh:', Robot.tongSoRobot());
