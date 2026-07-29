/**
 * SERVER — EXPRESS API
 * --------------------
 * Chạy:  npx tsx robot-game/server/server.ts   (chạy TỪ thư mục ts-basic)
 * Mở:    http://localhost:3000
 *
 * Luồng của MỖI request thay đổi dữ liệu:
 *   đọc row -> Factory hồi sinh -> gọi method OOP -> toRow() -> lưu lại
 * Đó là vòng đời thật của một object trong web app.
 */
import express from 'express';
import path from 'node:path';
import { khoiTaoBang } from './db.js';
import * as kho from './RobotRepository.js';
import { taoRobotMoi, sinhSerial } from './RobotFactory.js';
import { RobotChienDau } from '../../oop/RobotChienDau.js';
import { TaoRobotSchema, DauTruongSchema, ChargeSchema, } from './schemas.js';
import { batDauVongThoiGian, layNhatKy, NHIP_TICK_MS } from './gameLoop.js';
const app = express();
app.use(express.json());
// Client là file HTML tĩnh. Đường dẫn tính từ nơi chạy lệnh (ts-basic/).
app.use(express.static(path.join(process.cwd(), 'robot-game', 'client')));
khoiTaoBang();
batDauVongThoiGian();
// =====================================================================
// Chuyển object Robot -> JSON trả về client
// =====================================================================
/**
 * ⚠️ KHÔNG bao giờ `res.json(robot)` trực tiếp!
 *
 * JSON.stringify(robot) sẽ kéo theo `maBiMat` (private của TS bị xoá lúc
 * build nên vẫn là property thường) -> lộ bí mật ra client.
 * Luôn đi qua toRow() để class tự chọn field nào được ra ngoài.
 */
function dangGuiVeClient(robot) {
    const duLieu = robot.toRow();
    return {
        ...duLieu,
        loaiHienThi: robot.loai,
        moTa: robot.moTa(),
        coTheChienDau: robot instanceof RobotChienDau,
    };
}
// =====================================================================
// ROUTES
// =====================================================================
app.get('/api/robots', (_req, res) => {
    res.json(kho.layTatCa().map(dangGuiVeClient));
});
app.post('/api/robots', (req, res) => {
    // Validate input từ client — không tin gì người dùng gửi lên
    const kq = TaoRobotSchema.safeParse(req.body);
    if (!kq.success) {
        res.status(400).json({ loi: kq.error.issues[0]?.message ?? 'Du lieu khong hop le' });
        return;
    }
    const robot = taoRobotMoi(kq.data, sinhSerial());
    kho.themMoi(robot);
    res.status(201).json(dangGuiVeClient(robot));
});
app.delete('/api/robots/:serial', (req, res) => {
    const daXoa = kho.xoa(req.params.serial);
    if (!daXoa) {
        res.status(404).json({ loi: 'Khong tim thay robot' });
        return;
    }
    res.json({ ok: true });
});
app.post('/api/robots/:serial/lam-viec', (req, res) => {
    // ⭐ Đây là chỗ thấy rõ nhất giá trị của Factory:
    // tim() trả về object SỐNG nên gọi thẳng lamViec() được.
    const robot = kho.tim(req.params.serial);
    if (robot === null) {
        res.status(404).json({ loi: 'Khong tim thay robot' });
        return;
    }
    if (robot.pin <= 0) {
        res.status(400).json({ loi: `${robot.ten} het pin, phai sac truoc` });
        return;
    }
    const ketQua = robot.lamViec(); // ← method OOP, mỗi loại làm một kiểu (đa hình)
    robot.trangThai = robot.pin <= 0 ? 'het-pin' : 'dang-lam';
    kho.capNhat(robot);
    kho.tangSoViecLam(robot.toRow().serial);
    res.json({ ketQua, robot: dangGuiVeClient(robot) });
});
app.post('/api/robots/:serial/charge', (req, res) => {
    const robot = kho.tim(req.params.serial);
    if (robot === null) {
        res.status(404).json({ loi: 'Khong tim thay robot' });
        return;
    }
    const kq = ChargeSchema.safeParse(req.body ?? {});
    const luong = kq.success ? kq.data.luong : 20;
    const ketQua = robot.charge(luong); // method charge() ở lớp cha
    robot.trangThai = 'san-sang';
    kho.capNhat(robot);
    res.json({ ketQua, robot: dangGuiVeClient(robot) });
});
app.post('/api/robots/:serial/dung', (req, res) => {
    const robot = kho.tim(req.params.serial);
    if (robot === null) {
        res.status(404).json({ loi: 'Khong tim thay robot' });
        return;
    }
    robot.trangThai = robot.pin <= 0 ? 'het-pin' : 'san-sang';
    kho.capNhat(robot);
    res.json({ ketQua: `[${robot.ten}] Da dung lam viec`, robot: dangGuiVeClient(robot) });
});
// =====================================================================
// ĐẤU TRƯỜNG — dùng interface ICoTheChienDau
// =====================================================================
app.post('/api/dau-truong', (req, res) => {
    const kq = DauTruongSchema.safeParse(req.body);
    if (!kq.success) {
        res.status(400).json({ loi: 'Phai chon du 2 robot' });
        return;
    }
    const a = kho.tim(kq.data.serialA);
    const b = kho.tim(kq.data.serialB);
    if (a === null || b === null) {
        res.status(404).json({ loi: 'Khong tim thay robot' });
        return;
    }
    // Chỉ robot chiến đấu mới đấu được -> narrowing bằng instanceof
    if (!(a instanceof RobotChienDau) || !(b instanceof RobotChienDau)) {
        res.status(400).json({ loi: 'Ca hai phai la robot chien dau' });
        return;
    }
    if (a.pin <= 0 || b.pin <= 0) {
        res.status(400).json({ loi: 'Robot het pin khong the dau' });
        return;
    }
    const nhatKyTran = [];
    // Mỗi bên tung một đòn bằng vũ khí ngẫu nhiên trong danhSachVuKhi
    const vuKhiA = a.danhSachVuKhi[Math.floor(Math.random() * a.danhSachVuKhi.length)];
    const vuKhiB = b.danhSachVuKhi[Math.floor(Math.random() * b.danhSachVuKhi.length)];
    nhatKyTran.push(a.chienDau(vuKhiA).trim());
    nhatKyTran.push(b.chienDau(vuKhiB).trim());
    // Sức mạnh hiện tại phụ thuộc pin -> pin yếu thì đánh yếu
    const diemA = a.sucManhHienTai;
    const diemB = b.sucManhHienTai;
    let thang;
    let thua;
    if (diemA === diemB) {
        // hoà thì bốc thăm cho có kết quả
        [thang, thua] = Math.random() < 0.5 ? [a, b] : [b, a];
        nhatKyTran.push(`⚖️ Hoa ${diemA}-${diemB}, phan thang thuoc ve ${thang.ten}`);
    }
    else {
        [thang, thua] = diemA > diemB ? [a, b] : [b, a];
        nhatKyTran.push(`🏆 ${thang.ten} thang! (${Math.max(diemA, diemB)} vs ${Math.min(diemA, diemB)})`);
    }
    // Bên thua tốn thêm pin
    thua.tieuHaoPin(10);
    kho.capNhat(a);
    kho.capNhat(b);
    kho.ghiKetQuaTran(thang.toRow().serial, thua.toRow().serial);
    res.json({
        nhatKy: nhatKyTran,
        thang: thang.ten,
        robotA: dangGuiVeClient(a),
        robotB: dangGuiVeClient(b),
    });
});
// =====================================================================
// BẢNG XẾP HẠNG & NHẬT KÝ
// =====================================================================
app.get('/api/bang-xep-hang', (_req, res) => {
    res.json(kho.layBangXepHang());
});
app.get('/api/nhat-ky', (_req, res) => {
    res.json(layNhatKy());
});
// =====================================================================
const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
    console.log(`
🤖 Robot Game dang chay
   Mo trinh duyet: http://localhost:${PORT}
   Vong thoi gian: ${NHIP_TICK_MS / 1000}s/tick
   Database:       robot-game/robot-game.db

   (Canh bao ExperimentalWarning cua node:sqlite la binh thuong)
   Ctrl+C de dung.
`);
});
