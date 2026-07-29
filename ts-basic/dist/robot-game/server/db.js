/**
 * TẦNG DATABASE — node:sqlite
 * ---------------------------
 * `node:sqlite` có SẴN trong Node 22, không cần npm install.
 * Nó in ra ExperimentalWarning khi chạy — đó là cảnh báo bình thường,
 * không phải lỗi.
 *
 * Xem phần thảo luận thiết kế bảng trong ../../game.md
 */
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
// File .db nằm cạnh thư mục robot-game, chạy từ ts-basic/
const DUONG_DAN_DB = path.join(process.cwd(), 'robot-game', 'robot-game.db');
export const db = new DatabaseSync(DUONG_DAN_DB);
/**
 * THIẾT KẾ BẢNG: chiến lược "Single Table Inheritance"
 *
 * Cả 3 loại robot nằm chung MỘT bảng. Cột nào không thuộc loại đó thì để NULL.
 * Cột `loai` là CỘT PHÂN LOẠI — nó chính là discriminated union
 * (advanced.md mục 12) nhưng nằm dưới database.
 *
 * Vì sao chọn cách này? Xem bảng so sánh 3 chiến lược trong game.md.
 */
export function khoiTaoBang() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS robots (
      serial        TEXT PRIMARY KEY,
      ten           TEXT    NOT NULL,
      loai          TEXT    NOT NULL,   -- 'chien-dau' | 'y-te' | 've-sinh'
      pin           INTEGER NOT NULL DEFAULT 100,
      vi_tri        TEXT    NOT NULL DEFAULT 'kho',
      trang_thai    TEXT    NOT NULL DEFAULT 'san-sang',

      -- Cột riêng của robot chiến đấu (NULL với loại khác)
      suc_tan_cong  INTEGER,
      do_cao_toi_da INTEGER,

      -- Cột riêng của robot y tế
      chuyen_khoa   TEXT,

      -- Cột riêng của robot vệ sinh
      khu_vuc       TEXT,

      tao_luc       TEXT    NOT NULL
    );
  `);
    // Bảng thống kê tách riêng, khoá ngoại trỏ về robots.
    // ON DELETE CASCADE: xoá robot thì thống kê của nó tự mất theo.
    db.exec(`
    CREATE TABLE IF NOT EXISTS thong_ke (
      serial        TEXT PRIMARY KEY,
      so_viec_lam   INTEGER NOT NULL DEFAULT 0,
      so_tran_thang INTEGER NOT NULL DEFAULT 0,
      so_tran_thua  INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (serial) REFERENCES robots(serial) ON DELETE CASCADE
    );
  `);
    // SQLite mặc định TẮT kiểm tra khoá ngoại — phải bật thủ công,
    // nếu không thì ON DELETE CASCADE ở trên sẽ không chạy.
    db.exec('PRAGMA foreign_keys = ON;');
}
/** Xoá sạch dữ liệu — tiện khi muốn chơi lại từ đầu */
export function xoaSachDuLieu() {
    db.exec('DELETE FROM thong_ke;');
    db.exec('DELETE FROM robots;');
}
