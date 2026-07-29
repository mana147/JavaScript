/**
 * LỚP CƠ SỞ TRỪU TƯỢNG — abstract class Robot
 * -------------------------------------------
 * File này gói phần lớn bài học OOP. Xem giải thích trong ../oop.md
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Robot_taoLuc, _Robot_serial;
/**
 * TÍNH TRỪU TƯỢNG (Abstraction)
 *
 * `abstract` = lớp KHUÔN MẪU, không tạo object trực tiếp được.
 * Nó nói: "mọi Robot đều có tên, có pin, đều làm việc được" —
 * nhưng làm việc CỤ THỂ thế nào thì để lớp con quyết định.
 *
 * Robot chung chung không tồn tại ngoài đời. Chỉ có robot chiến đấu,
 * robot y tế... => đúng bản chất thì Robot phải là abstract.
 */
export class Robot {
    get taoLuc() {
        return __classPrivateFieldGet(this, _Robot_taoLuc, "f");
    }
    static tongSoRobot() {
        return Robot.demSoRobot;
    }
    // ===================================================================
    // CONSTRUCTOR
    // ===================================================================
    constructor(ten, serial) {
        // ===================================================================
        // TÍNH ĐÓNG GÓI (Encapsulation) — 4 mức che giấu, so sánh trực tiếp
        // ===================================================================
        // public: ai cũng đọc/ghi được (mặc định nếu không ghi gì)
        this.viTri = 'kho';
        // protected: lớp này VÀ lớp con dùng được, bên ngoài thì không
        // mặc định nangLuong = 100, nhưng lớp con có thể thay đổi nếu muốn
        this.nangLuong = 100;
        // Trạng thái làm việc — dùng cho game (vòng tick sẽ đọc field này)
        this.trangThai = 'san-sang';
        // Thời điểm tạo, lưu dạng chuỗi ISO cho dễ ghi xuống database.
        //
        // Dùng `#private` + getter thay vì `readonly`: bên ngoài vẫn KHÔNG sửa
        // được (giống readonly), nhưng khoiPhucTrangThai() ở trong class thì đặt
        // lại được. Cần vậy vì khi đọc từ DB, Factory `new` ra object mới —
        // nếu không khôi phục thì robot nào cũng thành "vừa mới tạo".
        _Robot_taoLuc.set(this, new Date().toISOString());
        // #private (JS gốc): private THẬT, runtime chặn thật, không cách nào lách
        _Robot_serial.set(this, void 0);
        this.ten = ten;
        __classPrivateFieldSet(this, _Robot_serial, serial, "f");
        this.maBiMat = `SECRET-${serial}`;
        // mỗi lần tạo robot mới thì tăng bộ đếm dùng chung
        Robot.demSoRobot++;
    }
    // ===================================================================
    // GETTER / SETTER — lý do THẬT SỰ để đóng gói
    // ===================================================================
    // Nếu để `public nangLuong` thì bên ngoài gán nangLuong = -999 cũng được.
    // Đóng gói + setter cho phép CHẶN dữ liệu vô lý ngay tại cửa.
    get pin() {
        return this.nangLuong;
    }
    set pin(giaTri) {
        if (giaTri < 0) {
            console.log(`  ⚠️  [${this.ten}] Pin khong the am, giu nguyen ${this.nangLuong}`);
            return;
        }
        if (giaTri > 100) {
            console.log(`  ⚠️  [${this.ten}] Pin toi da 100, tu dong cat xuong`);
            this.nangLuong = 100;
            return;
        }
        this.nangLuong = giaTri;
    }
    // Chỉ cho đọc 4 ký tự cuối của serial — che giấu phần còn lại
    get serialRutGon() {
        return `****${__classPrivateFieldGet(this, _Robot_serial, "f").slice(-4)}`;
    }
    // ===================================================================
    // METHOD DÙNG CHUNG — lớp con kế thừa và dùng lại, khỏi viết lại
    // ===================================================================
    khoiDong() {
        return `[${this.ten}] Khoi dong... pin ${this.nangLuong}%`;
    }
    tieuHaoPin(luong) {
        // dùng chính setter ở trên nên vẫn được validate
        this.pin = this.nangLuong - luong;
    }
    /**
     * NẠP PIN — cặp đối xứng với tieuHaoPin() ở trên.
     *
     * Đặt ở lớp cha nên MỌI loại robot đều tự động có, không lớp nào
     * phải viết lại. Đây chính là lợi ích của kế thừa.
     */
    charge(luong) {
        if (luong <= 0) {
            return `  ⚠️  [${this.ten}] Luong nap phai lon hon 0`;
        }
        const pinTruocKhiNap = this.nangLuong;
        // Gán qua setter `pin` nên tự động bị cắt trần ở 100 —
        // KHÔNG cần tự kiểm tra lại ở đây. Đó là lợi ích của đóng gói:
        // luật "pin không quá 100" chỉ nằm ở đúng MỘT chỗ duy nhất.
        this.pin = this.nangLuong + luong;
        return `  🔌 [${this.ten}] Nap ${luong}%: ${pinTruocKhiNap}% -> ${this.nangLuong}%`;
    }
    // Lớp con sẽ override method này, nhưng vẫn gọi lại được bản gốc qua super
    moTa() {
        return `Robot "${this.ten}" (${this.loai}) - serial ${this.serialRutGon}`;
    }
    // Chứng minh private của TS không thật — xem section 9 của main.ts
    layMaBiMat() {
        return this.maBiMat;
    }
    // ===================================================================
    // LƯU XUỐNG DATABASE — xem game.md
    // ===================================================================
    /**
     * ⭐ CLASS TỰ BIẾT CÁCH SERIALIZE CHÍNH NÓ
     *
     * Vì sao không dùng thẳng JSON.stringify(robot)? Vì nó sai cả hai đầu:
     *   - `#serial` BỊ MẤT   -> không có khoá chính để lưu
     *   - `maBiMat` LỌT RA   -> lộ bí mật khi API trả về client
     *
     * Viết toRow() ngay TRONG class thì giải quyết được cả hai:
     *   - đang ở trong class nên đọc được `#serial`
     *   - chủ động chọn field nào đi ra, `maBiMat` bị bỏ lại
     *
     * Lớp con override và gọi super.toRow() để thêm field riêng.
     */
    toRow() {
        return {
            serial: __classPrivateFieldGet(this, _Robot_serial, "f"), // ✅ đọc được vì đang ở TRONG class
            ten: this.ten,
            pin: this.nangLuong,
            viTri: this.viTri,
            trangThai: this.trangThai,
            taoLuc: this.taoLuc,
            // ⚠️ CỐ Ý không đưa `maBiMat` vào — bí mật không rời khỏi server
        };
    }
    /**
     * Chiều ngược lại: nạp state từ database vào object vừa được `new`.
     *
     * Tách riêng khỏi constructor để KHÔNG phải đổi chữ ký constructor,
     * nhờ vậy các bài học cũ trong main.ts vẫn chạy nguyên vẹn.
     */
    khoiPhucTrangThai(pin, viTri, trangThai, taoLuc) {
        this.nangLuong = pin;
        this.viTri = viTri;
        this.trangThai = trangThai;
        // Khôi phục cả thời điểm tạo gốc, nếu không object đọc từ DB
        // sẽ mang mốc thời gian của lúc `new` chứ không phải lúc tạo thật
        if (taoLuc !== undefined)
            __classPrivateFieldSet(this, _Robot_taoLuc, taoLuc, "f");
    }
}
_Robot_taoLuc = new WeakMap(), _Robot_serial = new WeakMap();
// ===================================================================
// THÀNH VIÊN TĨNH (static) — thuộc về LỚP, không thuộc về object
// ===================================================================
// Dùng chung cho mọi Robot, không phải mỗi robot một bản
Robot.demSoRobot = 0;
