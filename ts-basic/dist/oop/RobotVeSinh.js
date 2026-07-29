/**
 * LỚP CON 3 — RobotVeSinh
 * -----------------------
 * Trong oop/main.ts section 4 có một bản định nghĩa NGAY TẠI CHỖ để minh hoạ
 * "thêm loại mới mà vòng lặp đa hình không phải sửa". Bản đó chỉ sống trong
 * main.ts. File này là bản thật, dùng cho game.
 */
import { Robot } from './Robot.js';
export class RobotVeSinh extends Robot {
    constructor(ten, serial, khuVuc = 'toan nha') {
        super(ten, serial);
        this.khuVuc = khuVuc;
    }
    lamViec() {
        this.tieuHaoPin(5); // quét dọn tốn ít pin nhất
        return `🧹 [${this.ten}] Dang quet don ${this.khuVuc}`;
    }
    get loai() {
        return 'Ve sinh';
    }
    moTa() {
        return `${super.moTa()} | Khu vuc: ${this.khuVuc}`;
    }
}
