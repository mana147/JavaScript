/**
 * LỚP CON 2 — RobotYTe
 * --------------------
 * Cùng kế thừa Robot như RobotChienDau, nhưng hành vi khác hẳn
 * -> đây chính là ĐA HÌNH.
 */

import { Robot } from './Robot.js';
import type { DuLieuRobot } from './Robot.js';
import type { ICoTheSac } from './interfaces.js';

/** Dữ liệu riêng của robot y tế khi lưu xuống DB */
export interface DuLieuRobotYTe extends DuLieuRobot {
  chuyenKhoa: string;
}

export class RobotYTe extends Robot implements ICoTheSac {
  // Cú pháp rút gọn: khai báo modifier ngay trong constructor,
  // TS tự tạo thuộc tính và gán `this.chuyenKhoa = chuyenKhoa`
  public dungLuongPin: number = 5000;

  private soBenhNhanDaKham: number = 0;

  constructor(
    ten: string,
    serial: string,
    public readonly chuyenKhoa: string, // parameter property
  ) {
    super(ten, serial);
  }

  // ===================================================================
  // ĐA HÌNH — cùng tên lamViec() nhưng nội dung hoàn toàn khác
  // ===================================================================

  lamViec(): string {
    this.tieuHaoPin(10);
    this.soBenhNhanDaKham++;
    return `🏥 [${this.ten}] Dang kham benh (${this.chuyenKhoa}) - benh nhan thu ${this.soBenhNhanDaKham}`;
  }

  get loai(): string {
    return 'Y te';
  }

  override moTa(): string {
    return `${super.moTa()} | Chuyen khoa: ${this.chuyenKhoa}, da kham ${this.soBenhNhanDaKham} ca`;
  }

  // Cài đặt ICoTheSac — DÙNG LẠI charge() của lớp cha thay vì viết lại
  // logic nạp pin, chỉ thêm phần riêng của robot y tế vào.
  sac(luong: number): string {
    return `${this.charge(luong)} 🔋 (sac nhanh chuyen dung y te)`;
  }

  // Override để thêm cột riêng của robot y tế
  override toRow(): DuLieuRobotYTe {
    return {
      ...super.toRow(),
      chuyenKhoa: this.chuyenKhoa,
    };
  }
}
