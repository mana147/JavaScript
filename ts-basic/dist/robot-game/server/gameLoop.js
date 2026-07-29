/**
 * VÒNG THỜI GIAN (GAME TICK)
 * --------------------------
 * Cứ vài giây, robot nào đang ở trạng thái 'dang-lam' thì tụt pin.
 * Hết pin thì chuyển sang 'het-pin' và phải sạc lại mới làm việc tiếp.
 *
 * Đây là chỗ thấy rõ vòng đời object trong app thật:
 *   đọc DB -> hồi sinh thành object -> gọi method -> lưu lại
 */
import * as kho from './RobotRepository.js';
/** Mỗi tick tụt bao nhiêu % pin */
const PIN_TUT_MOI_TICK = 8;
/** Khoảng cách giữa 2 tick (ms) */
export const NHIP_TICK_MS = 3000;
// Nhật ký 20 tick gần nhất, để client hiển thị
const nhatKy = [];
export function layNhatKy() {
    return nhatKy;
}
function chayMotTick() {
    const dong = [];
    // ⭐ layTatCa() trả về object SỐNG (đã qua Factory), không phải row phẳng
    for (const robot of kho.layTatCa()) {
        if (robot.trangThai !== 'dang-lam')
            continue;
        // gọi method OOP thật — tieuHaoPin() đi qua setter nên vẫn được validate
        robot.tieuHaoPin(PIN_TUT_MOI_TICK);
        if (robot.pin <= 0) {
            robot.trangThai = 'het-pin';
            dong.push(`🪫 ${robot.ten} het pin, dung lam viec`);
        }
        else {
            dong.push(`⚙️ ${robot.ten} dang lam viec, pin con ${robot.pin}%`);
        }
        // lưu state mới xuống DB
        kho.capNhat(robot);
    }
    if (dong.length > 0) {
        nhatKy.unshift({ luc: new Date().toLocaleTimeString('vi-VN'), noiDung: dong });
        if (nhatKy.length > 20)
            nhatKy.length = 20;
    }
}
let boDem = null;
export function batDauVongThoiGian() {
    if (boDem !== null)
        return;
    boDem = setInterval(chayMotTick, NHIP_TICK_MS);
}
export function dungVongThoiGian() {
    if (boDem === null)
        return;
    clearInterval(boDem);
    boDem = null;
}
