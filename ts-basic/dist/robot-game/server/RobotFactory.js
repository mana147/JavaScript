/**
 * ⭐ FACTORY — HỒI SINH ROW THÀNH OBJECT SỐNG
 * -------------------------------------------
 * Đây là file quan trọng nhất của cả game. Nó giải quyết vấn đề cốt lõi:
 *
 *   Database chỉ lưu được DỮ LIỆU. Object cần cả DỮ LIỆU + HÀNH VI.
 *
 * Đọc từ DB ra, ta được một row phẳng — không phải Robot:
 *   row.lamViec()            -> undefined, không gọi được
 *   row instanceof Robot     -> false
 *
 * Factory `new` lại đúng class rồi nạp state vào, để object "sống" trở lại:
 *   robot.lamViec()          -> chạy được
 *   robot instanceof Robot   -> true
 */
import { RobotChienDau } from '../../oop/RobotChienDau.js';
import { RobotYTe } from '../../oop/RobotYTe.js';
import { RobotVeSinh } from '../../oop/RobotVeSinh.js';
/**
 * Xác định mã loại để lưu xuống DB.
 *
 * Đặt ở ĐÂY chứ không phải trong class Robot là có chủ đích:
 * class OOP không nên biết database gọi nó bằng mã gì. Đổi mã cột
 * thì chỉ sửa file này, không đụng tới oop/.
 */
export function xacDinhLoai(robot) {
    if (robot instanceof RobotChienDau)
        return 'chien-dau';
    if (robot instanceof RobotYTe)
        return 'y-te';
    if (robot instanceof RobotVeSinh)
        return 've-sinh';
    throw new Error(`Loai robot chua duoc ho tro luu DB: ${robot.constructor.name}`);
}
/**
 * ⭐ HỒI SINH: row phẳng -> instance class đầy đủ method
 *
 * `switch` trên cột `loai` chính là narrowing của discriminated union
 * (advanced.md mục 12), chỉ khác là dữ liệu đến từ database.
 */
export function hoiSinhTuRow(row) {
    let robot;
    switch (row.loai) {
        case 'chien-dau':
            robot = new RobotChienDau(row.ten, row.serial, row.suc_tan_cong ?? 50, // cột nullable -> phải có giá trị dự phòng
            row.do_cao_toi_da ?? 500);
            break;
        case 'y-te':
            robot = new RobotYTe(row.ten, row.serial, row.chuyen_khoa ?? 'tong quat');
            break;
        case 've-sinh':
            robot = new RobotVeSinh(row.ten, row.serial, row.khu_vuc ?? 'toan nha');
            break;
        default:
            // Exhaustiveness check: thêm loại robot mới vào LoaiRobot mà quên
            // xử lý ở đây thì TypeScript báo lỗi NGAY tại dòng này.
            return khongBaoGioToiDay(row.loai);
    }
    // `new` xong mới chỉ có robot pin đầy, mặc định. Phải nạp lại state
    // đã lưu, nếu không thì mỗi lần đọc từ DB robot lại đầy pin.
    robot.khoiPhucTrangThai(row.pin, row.vi_tri, row.trang_thai, row.tao_luc);
    return robot;
}
function khongBaoGioToiDay(x) {
    throw new Error('Loai robot chua duoc xu ly: ' + JSON.stringify(x));
}
/**
 * Tạo robot MỚI từ input của client (đã qua Zod validate).
 * Khác `hoiSinhTuRow` ở chỗ: robot mới thì pin đầy, chưa có state cũ.
 */
export function taoRobotMoi(input, serial) {
    switch (input.loai) {
        case 'chien-dau':
            return new RobotChienDau(input.ten, serial, input.sucTanCong, input.doCaoToiDa);
        case 'y-te':
            return new RobotYTe(input.ten, serial, input.chuyenKhoa);
        case 've-sinh':
            return new RobotVeSinh(input.ten, serial, input.khuVuc);
        default:
            return khongBaoGioToiDay(input);
    }
}
/** Sinh serial ngẫu nhiên dạng SN-XXXX-XXXX */
export function sinhSerial() {
    const khoi = () => Math.floor(1000 + Math.random() * 9000).toString();
    return `SN-${khoi()}-${khoi()}`;
}
