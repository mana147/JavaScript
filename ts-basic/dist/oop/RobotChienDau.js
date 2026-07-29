/**
 * LỚP CON 1 — RobotChienDau
 * -------------------------
 * Minh hoạ: KẾ THỪA + ĐA HÌNH + implements nhiều interface
 */
// ⚠️ Dùng ESM nên import file nội bộ BẮT BUỘC ghi đuôi .js
//    (dù file nguồn là .ts) — xem doc.md mục 4.12
import { Robot } from './Robot.js';
/**
 * TÍNH KẾ THỪA (Inheritance)
 * `extends Robot` = nhận HẾT thuộc tính và method của Robot, khỏi viết lại.
 *
 * Đồng thời `implements` 2 interface — điều mà `extends` không làm được
 * (chỉ extends được đúng MỘT lớp cha).
 */
export class RobotChienDau extends Robot {
    constructor(ten, serial, sucTanCong, doCaoToiDa = 500) {
        // super() gọi constructor của lớp cha — PHẢI gọi trước khi dùng `this`
        super(ten, serial);
        // Bắt buộc có vì implements ICoTheChienDau
        this.dungLuongPin = 5000;
        this.danhSachVuKhi = ['Sung laser', 'Ten lua', 'Kiem plasma'];
        this.sucTanCong = sucTanCong;
        this.doCaoToiDa = doCaoToiDa;
    }
    /** Sức tấn công thực tế — pin càng yếu đánh càng yếu */
    get sucManhHienTai() {
        return Math.round(this.sucTanCong * (this.pin / 100));
    }
    // ===================================================================
    // ĐA HÌNH — override method trừu tượng của lớp cha
    // ===================================================================
    // Cùng tên `lamViec()` như RobotYTe, nhưng làm việc khác hẳn
    lamViec() {
        this.tieuHaoPin(30); // dùng method kế thừa từ lớp cha
        return `⚔️  [${this.ten}] Tan cong muc tieu! Suc manh ${this.sucTanCong}`;
    }
    get loai() {
        return 'Chien dau';
    }
    // ===================================================================
    // OVERRIDE để MỞ RỘNG, không phải thay thế — nhờ super.moTa()
    // ===================================================================
    moTa() {
        // gọi lại bản của lớp cha rồi thêm thông tin riêng vào
        return `${super.moTa()} | Suc tan cong: ${this.sucTanCong}, tran bay ${this.doCaoToiDa}m`;
    }
    // ===================================================================
    // Cài đặt các interface đã cam kết
    // ===================================================================
    bay(met) {
        if (met > this.doCaoToiDa) {
            return `  ⚠️  [${this.ten}] Khong the bay cao hon ${this.doCaoToiDa}m`;
        }
        this.tieuHaoPin(10);
        return `  ✈️  [${this.ten}] Dang bay o do cao ${met}m`;
    }
    tuSua() {
        // `nangLuong` là protected của lớp cha -> lớp con dùng được
        // (nếu là private thì dòng này sẽ báo lỗi)
        this.nangLuong = Math.min(100, this.nangLuong + 20);
        return `  🔧 [${this.ten}] Tu sua xong, pin ${this.nangLuong}%`;
    }
    // Cài đặt ICoTheChienDau — dùng cho đấu trường trong game
    chienDau(vuKhi) {
        if (!this.danhSachVuKhi.includes(vuKhi)) {
            return `  ⚠️  [${this.ten}] Khong co vu khi "${vuKhi}"`;
        }
        this.tieuHaoPin(15);
        return `  💥 [${this.ten}] Tung don bang ${vuKhi}! Suc manh ${this.sucManhHienTai}`;
    }
    // Override để thêm 2 cột riêng của robot chiến đấu
    toRow() {
        return {
            ...super.toRow(), // lấy phần chung từ lớp cha
            sucTanCong: this.sucTanCong,
            doCaoToiDa: this.doCaoToiDa,
        };
    }
}
