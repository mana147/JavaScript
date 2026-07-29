/**
 * REPOSITORY — CẦU NỐI GIỮA CLASS VÀ BẢNG
 * ---------------------------------------
 * Mọi câu SQL nằm gọn trong file này. Phần còn lại của app chỉ làm việc
 * với object Robot, không biết database tồn tại.
 *
 * Lợi ích: muốn đổi từ SQLite sang Postgres thì chỉ sửa file này.
 */
import { db } from './db.js';
import { RobotChienDau } from '../../oop/RobotChienDau.js';
import { RobotYTe } from '../../oop/RobotYTe.js';
import { RobotVeSinh } from '../../oop/RobotVeSinh.js';
import { hoiSinhTuRow, xacDinhLoai } from './RobotFactory.js';
import { RobotRowSchema, ThongKeRowSchema } from './schemas.js';
// =====================================================================
// ĐỌC — row -> object sống
// =====================================================================
/**
 * ⚠️ node:sqlite trả về `unknown`, và row có [Object: null prototype].
 * Không có gì đảm bảo cột đúng kiểu -> PHẢI validate bằng Zod trước khi tin.
 */
function docRow(duLieuTho) {
    const kq = RobotRowSchema.safeParse(duLieuTho);
    if (!kq.success) {
        throw new Error(`Row trong DB sai dinh dang: ${kq.error.issues[0]?.message}`);
    }
    return kq.data;
}
export function layTatCa() {
    const rows = db.prepare('SELECT * FROM robots ORDER BY tao_luc DESC').all();
    // Mỗi row đi qua: validate -> hồi sinh thành instance có đủ method
    return rows.map((row) => hoiSinhTuRow(docRow(row)));
}
export function tim(serial) {
    const row = db.prepare('SELECT * FROM robots WHERE serial = ?').get(serial);
    if (row === undefined)
        return null;
    return hoiSinhTuRow(docRow(row));
}
// =====================================================================
// GHI — object -> row
// =====================================================================
/**
 * Lấy dữ liệu để ghi xuống DB.
 *
 * Gọi `robot.toRow()` — class TỰ quyết định field nào được đi ra.
 * Nhờ vậy `maBiMat` không bao giờ chạm tới database.
 */
function chuyenThanhCotDb(robot) {
    const duLieu = robot.toRow();
    const loai = xacDinhLoai(robot);
    // Giá trị mặc định cho các cột riêng — loại nào không có thì NULL
    let sucTanCong = null;
    let doCaoToiDa = null;
    let chuyenKhoa = null;
    let khuVuc = null;
    // Narrowing bằng instanceof để lấy field riêng của từng lớp con
    if (robot instanceof RobotChienDau) {
        const rieng = robot.toRow();
        sucTanCong = rieng.sucTanCong;
        doCaoToiDa = rieng.doCaoToiDa;
    }
    else if (robot instanceof RobotYTe) {
        chuyenKhoa = robot.toRow().chuyenKhoa;
    }
    else if (robot instanceof RobotVeSinh) {
        khuVuc = robot.khuVuc;
    }
    return {
        serial: duLieu.serial,
        ten: duLieu.ten,
        loai,
        pin: duLieu.pin,
        vi_tri: duLieu.viTri,
        trang_thai: duLieu.trangThai,
        suc_tan_cong: sucTanCong,
        do_cao_toi_da: doCaoToiDa,
        chuyen_khoa: chuyenKhoa,
        khu_vuc: khuVuc,
        tao_luc: duLieu.taoLuc,
    };
}
export function themMoi(robot) {
    const cot = chuyenThanhCotDb(robot);
    db.prepare(`INSERT INTO robots
       (serial, ten, loai, pin, vi_tri, trang_thai,
        suc_tan_cong, do_cao_toi_da, chuyen_khoa, khu_vuc, tao_luc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(cot.serial, cot.ten, cot.loai, cot.pin, cot.vi_tri, cot.trang_thai, cot.suc_tan_cong, cot.do_cao_toi_da, cot.chuyen_khoa, cot.khu_vuc, cot.tao_luc);
    // Tạo luôn dòng thống kê rỗng cho robot này
    db.prepare('INSERT INTO thong_ke (serial) VALUES (?)').run(cot.serial);
}
/** Lưu lại state sau khi robot làm việc / sạc / đánh nhau */
export function capNhat(robot) {
    const cot = chuyenThanhCotDb(robot);
    db.prepare('UPDATE robots SET pin = ?, vi_tri = ?, trang_thai = ? WHERE serial = ?').run(cot.pin, cot.vi_tri, cot.trang_thai, cot.serial);
}
export function xoa(serial) {
    const kq = db.prepare('DELETE FROM robots WHERE serial = ?').run(serial);
    return kq.changes > 0; // thong_ke tự xoá theo nhờ ON DELETE CASCADE
}
// =====================================================================
// THỐNG KÊ & BẢNG XẾP HẠNG
// =====================================================================
export function tangSoViecLam(serial) {
    db.prepare('UPDATE thong_ke SET so_viec_lam = so_viec_lam + 1 WHERE serial = ?').run(serial);
}
export function ghiKetQuaTran(serialThang, serialThua) {
    db.prepare('UPDATE thong_ke SET so_tran_thang = so_tran_thang + 1 WHERE serial = ?').run(serialThang);
    db.prepare('UPDATE thong_ke SET so_tran_thua = so_tran_thua + 1 WHERE serial = ?').run(serialThua);
}
/** JOIN 2 bảng để ra bảng xếp hạng */
export function layBangXepHang() {
    const rows = db
        .prepare(`SELECT r.serial, r.ten, r.loai, r.pin,
              t.so_viec_lam, t.so_tran_thang, t.so_tran_thua
       FROM robots r
       JOIN thong_ke t ON t.serial = r.serial`)
        .all();
    return rows
        .map((row) => {
        const r = row;
        const tk = ThongKeRowSchema.safeParse({
            serial: r.serial,
            so_viec_lam: r.so_viec_lam,
            so_tran_thang: r.so_tran_thang,
            so_tran_thua: r.so_tran_thua,
        });
        const thongKe = tk.success
            ? tk.data
            : { serial: String(r.serial), so_viec_lam: 0, so_tran_thang: 0, so_tran_thua: 0 };
        return {
            serial: thongKe.serial,
            ten: String(r.ten),
            loai: String(r.loai),
            pin: Number(r.pin),
            soViecLam: thongKe.so_viec_lam,
            soTranThang: thongKe.so_tran_thang,
            soTranThua: thongKe.so_tran_thua,
            // điểm: mỗi việc 1đ, mỗi trận thắng 5đ
            diem: thongKe.so_viec_lam + thongKe.so_tran_thang * 5,
        };
    })
        .sort((a, b) => b.diem - a.diem);
}
