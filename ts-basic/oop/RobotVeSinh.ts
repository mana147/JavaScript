/**
 * LỚP CON 3 — RobotVeSinh
 * -----------------------
 * Trong oop/main.ts section 4 có một bản định nghĩa NGAY TẠI CHỖ để minh hoạ
 * "thêm loại mới mà vòng lặp đa hình không phải sửa". Bản đó chỉ sống trong
 * main.ts. File này là bản thật, dùng cho game.
 */

import { Robot } from './Robot.js';

export class RobotVeSinh extends Robot {
  constructor(
    ten: string,
    serial: string,
    public readonly khuVuc: string = 'toan nha',
  ) {
    super(ten, serial);
  }

  lamViec(): string {
    this.tieuHaoPin(5); // quét dọn tốn ít pin nhất
    return `🧹 [${this.ten}] Dang quet don ${this.khuVuc}`;
  }

  get loai(): string {
    return 'Ve sinh';
  }

  override moTa(): string {
    return `${super.moTa()} | Khu vuc: ${this.khuVuc}`;
  }
}
