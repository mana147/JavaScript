/**
 * LỚP CON 2 — RobotYTe
 * --------------------
 * Cùng kế thừa Robot như RobotChienDau, nhưng hành vi khác hẳn
 * -> đây chính là ĐA HÌNH.
 */
import { Robot } from './Robot.js';
export class RobotYTe extends Robot {
    constructor(ten, serial, chuyenKhoa) {
        super(ten, serial);
        this.chuyenKhoa = chuyenKhoa;
        // Cú pháp rút gọn: khai báo modifier ngay trong constructor,
        // TS tự tạo thuộc tính và gán `this.chuyenKhoa = chuyenKhoa`
        this.dungLuongPin = 5000;
        this.soBenhNhanDaKham = 0;
    }
    // ===================================================================
    // ĐA HÌNH — cùng tên lamViec() nhưng nội dung hoàn toàn khác
    // ===================================================================
    lamViec() {
        this.tieuHaoPin(10);
        this.soBenhNhanDaKham++;
        return `🏥 [${this.ten}] Dang kham benh (${this.chuyenKhoa}) - benh nhan thu ${this.soBenhNhanDaKham}`;
    }
    get loai() {
        return 'Y te';
    }
    moTa() {
        return `${super.moTa()} | Chuyen khoa: ${this.chuyenKhoa}, da kham ${this.soBenhNhanDaKham} ca`;
    }
    // Cài đặt ICoTheSac — DÙNG LẠI charge() của lớp cha thay vì viết lại
    // logic nạp pin, chỉ thêm phần riêng của robot y tế vào.
    sac(luong) {
        return `${this.charge(luong)} 🔋 (sac nhanh chuyen dung y te)`;
    }
    // Override để thêm cột riêng của robot y tế
    toRow() {
        return {
            ...super.toRow(),
            chuyenKhoa: this.chuyenKhoa,
        };
    }
}
