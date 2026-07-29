# Robot Game — Khi OOP gặp Database

_Bài tổng hợp: dùng lại các class OOP ở [oop/](oop/) làm backend, lưu xuống SQLite, có API và client._

```bash
npx tsx robot-game/server/server.ts     # chạy TỪ thư mục ts-basic
# rồi mở http://localhost:3000
```

> Khi chạy sẽ thấy dòng `ExperimentalWarning: SQLite is an experimental feature` — đó là **cảnh báo bình thường** của `node:sqlite`, không phải lỗi.

---

## 1. Vấn đề cốt lõi: object có hành vi, database thì không

Trong [oop/main.ts](oop/main.ts), robot sống trong RAM. Chạy xong là mất. Muốn giữ lại thì phải ghi xuống database — và đây là lúc va vào vấn đề mà **mọi dự án thật đều gặp**:

> **Object = dữ liệu + hành vi. Database chỉ lưu được dữ liệu.**

Thử cách ngây thơ nhất — `JSON.stringify` thẳng object. Đây là kết quả **chạy thật** trên `RobotChienDau` của anh:

```js
JSON.stringify(chienBinh)
// {"viTri":"kho","nangLuong":100,"ten":"Optimus",
//  "maBiMat":"SECRET-SN-1234-5678","sucTanCong":95,"doCaoToiDa":800}

const doc = JSON.parse(json);
doc instanceof Robot   // false      ← object "chết"
doc.lamViec            // undefined  ← mất sạch method
doc.serial             // undefined  ← #serial BỊ MẤT
doc.maBiMat            // "SECRET-…" ← CÒN NGUYÊN 🔴
```

**Hỏng ở cả hai đầu, và hỏng ngược chiều nhau:**

| | Chuyện gì xảy ra | Hậu quả |
| --- | --- | --- |
| `#serial` (private JS thật) | `JSON.stringify` **bỏ qua** | Mất khoá chính, không lưu nổi vào DB |
| `maBiMat` (private của TS) | Bị xoá lúc build → thành property thường → **được serialize** | Bí mật server lọt ra client qua API 🔴 |
| Toàn bộ method | Không tồn tại trong JSON | Object thành dữ liệu chết |

Vế thứ hai chính là hậu quả thực tế của bài học section 9 trong [oop/main.ts](oop/main.ts): *`private` của TypeScript không thật*. Lúc đó nó chỉ là chuyện học thuật — ở đây nó thành **lỗ hổng bảo mật**.

---

## 2. Cách xử lý: `toRow()` + Factory

### Chiều đi ra — class tự serialize chính nó

Thay vì để `JSON.stringify` tự quyết, **class tự viết** phần này:

```ts
// oop/Robot.ts
toRow(): DuLieuRobot {
  return {
    serial: this.#serial,     // ✅ đọc được vì đang Ở TRONG class
    ten: this.ten,
    pin: this.nangLuong,
    viTri: this.viTri,
    trangThai: this.trangThai,
    taoLuc: this.taoLuc,
    // ⚠️ CỐ Ý không đưa `maBiMat` vào — bí mật ở lại server
  };
}
```

Giải quyết cả hai vấn đề cùng lúc: đang ở trong class nên **đọc được `#serial`**, và **chủ động chọn** field nào được đi ra.

Lớp con override để thêm cột riêng, gọi `super.toRow()` lấy phần chung:

```ts
// oop/RobotChienDau.ts
override toRow(): DuLieuRobotChienDau {
  return { ...super.toRow(), sucTanCong: this.sucTanCong, doCaoToiDa: this.doCaoToiDa };
}
```

### Chiều đi vào — Factory hồi sinh

Đọc từ DB ra chỉ được một row phẳng. Phải `new` lại đúng class rồi nạp state vào:

```ts
// robot-game/server/RobotFactory.ts
export function hoiSinhTuRow(row: RobotRow): Robot {
  let robot: Robot;
  switch (row.loai) {                       // ⭐ switch trên CỘT PHÂN LOẠI
    case 'chien-dau': robot = new RobotChienDau(row.ten, row.serial, ...); break;
    case 'y-te':      robot = new RobotYTe(row.ten, row.serial, ...);      break;
    case 've-sinh':   robot = new RobotVeSinh(row.ten, row.serial, ...);   break;
    default:          return khongBaoGioToiDay(row.loai);
  }
  robot.khoiPhucTrangThai(row.pin, row.vi_tri, row.trang_thai, row.tao_luc);
  return robot;
}
```

Kết quả — kiểm chứng thật sau khi đọc từ DB:

```
instanceof Robot?          true
instanceof RobotChienDau?  true
goi duoc lamViec()?        true
ket qua:  ⚔️ [Optimus] Tan cong muc tieu! Suc manh 90
```

Object đã **sống lại** đầy đủ hành vi.

> **Bẫy đã gặp thật khi làm bài này:** ban đầu `khoiPhucTrangThai()` quên khôi phục `taoLuc`. Vì Factory `new` ra object mới nên `taoLuc` bị đặt lại thành *bây giờ* — mọi robot đọc từ DB đều thành "vừa mới tạo". Đây là lỗi kinh điển của rehydration: **`new` xong mới chỉ có vỏ, phải nạp lại đủ state**, sót field nào là sai field đó.

---

## 3. Thiết kế database — 3 cách map cây kế thừa xuống bảng

Đây là câu hỏi thật sự thú vị: `Robot` có 3 lớp con, mỗi lớp có field riêng. SQL thì chỉ có bảng phẳng. Map thế nào?

### Cách 1 — Single Table Inheritance ✅ (dùng cho game này)

Một bảng chứa hết, thêm **cột phân loại**, cột nào không thuộc loại đó thì `NULL`.

```sql
CREATE TABLE robots (
  serial        TEXT PRIMARY KEY,
  ten           TEXT NOT NULL,
  loai          TEXT NOT NULL,    -- ⭐ CỘT PHÂN LOẠI
  pin           INTEGER NOT NULL DEFAULT 100,
  vi_tri        TEXT NOT NULL DEFAULT 'kho',
  trang_thai    TEXT NOT NULL DEFAULT 'san-sang',

  suc_tan_cong  INTEGER,          -- riêng robot chiến đấu
  do_cao_toi_da INTEGER,          -- riêng robot chiến đấu
  chuyen_khoa   TEXT,             -- riêng robot y tế
  khu_vuc       TEXT,             -- riêng robot vệ sinh

  tao_luc       TEXT NOT NULL
);
```

Dữ liệu thật trong bảng — robot chiến đấu thì `chuyen_khoa` là `NULL`:

```json
{"serial":"SN-6612-1861","ten":"Optimus","loai":"chien-dau",
 "pin":100,"suc_tan_cong":90,"chuyen_khoa":null}
```

| Ưu | Nhược |
| --- | --- |
| Đọc 1 lần, không JOIN | Nhiều cột NULL |
| Query "tất cả robot" cực dễ | Không đặt được `NOT NULL` cho field riêng |
| Thêm lớp con = thêm cột | Nhiều lớp con thì bảng phình to |

**Hợp với game nhỏ, ít lớp con, khác nhau ít.**

### Cách 2 — Class Table Inheritance

Bảng chung + mỗi lớp con một bảng, nối bằng khoá ngoại:

```sql
CREATE TABLE robots        (serial PK, ten, loai, pin, ...);
CREATE TABLE robot_chien_dau (serial PK REFERENCES robots, suc_tan_cong NOT NULL, ...);
CREATE TABLE robot_y_te      (serial PK REFERENCES robots, chuyen_khoa NOT NULL);
```

| Ưu | Nhược |
| --- | --- |
| Không cột NULL nào | Mỗi lần đọc phải JOIN |
| Đặt được `NOT NULL` đúng chỗ | Thêm/xoá phải ghi 2 bảng, cần transaction |
| Chuẩn hoá đẹp | Code phức tạp hơn hẳn |

**Hợp khi các lớp con khác nhau nhiều và cần ràng buộc chặt.**

### Cách 3 — Concrete Table Inheritance

Mỗi lớp con một bảng độc lập, không chia sẻ gì:

| Ưu | Nhược |
| --- | --- |
| Mỗi bảng gọn, tự đủ | Lặp lại cột chung ở mọi bảng |
| Không JOIN | Query "tất cả robot" phải `UNION` nhiều bảng |
| | Đổi field chung phải sửa mọi bảng |

**Ít dùng, trừ khi các lớp con gần như không liên quan gì nhau.**

### Vì sao chọn cách 1

Game này chỉ có 3 lớp con, chung phần lớn field (`pin`, `vi_tri`, `trang_thai`), mỗi lớp chỉ khác 1–2 field. Đánh đổi vài cột `NULL` để không phải JOIN và không cần transaction là hoàn toàn xứng đáng.

---

## 4. Cột `loai` chính là discriminated union

Đây là điểm nối đẹp nhất của bài này với những gì anh đã học.

Ở [advanced.md mục 12](advanced.md), discriminated union dùng field literal để narrow:

```ts
type TrangThaiTai<T> =
  | { trangThai: 'success'; duLieu: T }
  | { trangThai: 'error'; loi: string };
```

Cột `loai` trong SQL làm **đúng việc đó**, chỉ khác là dữ liệu nằm dưới database:

```ts
export const LoaiRobotSchema = z.enum(['chien-dau', 'y-te', 've-sinh']);

switch (row.loai) {
  case 'chien-dau': /* TS biết cần suc_tan_cong */ break;
  case 'y-te':      /* TS biết cần chuyen_khoa  */ break;
  case 've-sinh':   /* TS biết cần khu_vuc      */ break;
  default: return khongBaoGioToiDay(row.loai);   // ⭐ exhaustiveness check
}
```

**Phần thưởng:** thêm loại robot thứ 4 vào `LoaiRobotSchema` mà quên viết `case` cho nó → TypeScript báo lỗi ngay tại dòng `default`, chỉ đúng chỗ cần sửa. Compiler giữ cho database và code không bao giờ lệch nhau.

---

## 5. Zod validate ở CẢ HAI đầu

[zod.md](zod.md) dạy nguyên tắc *validate tại ranh giới hệ thống*. Ở đây có **hai** ranh giới, và nhiều người chỉ nhớ cái thứ nhất:

```
   client  ──①──►  server  ──②──►  database
                     ▲               │
                     └───────③───────┘
```

**① Input từ client** — hiển nhiên phải kiểm:

```ts
export const TaoRobotSchema = z.discriminatedUnion('loai', [
  z.object({ loai: z.literal('chien-dau'), ten: z.string().min(2), sucTanCong: z.number().int().min(1).max(100) }),
  z.object({ loai: z.literal('y-te'),      ten: z.string().min(2), chuyenKhoa: z.string().min(2) }),
  z.object({ loai: z.literal('ve-sinh'),   ten: z.string().min(2), khuVuc: z.string().min(2).default('toan nha') }),
]);
```

Thử gửi tên 1 ký tự: `{"loi":"Ten robot phai tu 2 ky tu"}` ✅

**③ Row đọc từ database** — chỗ hay bị bỏ qua:

```ts
function docRow(duLieuTho: unknown): RobotRow {
  const kq = RobotRowSchema.safeParse(duLieuTho);
  if (!kq.success) throw new Error(`Row trong DB sai dinh dang: ...`);
  return kq.data;
}
```

Vì sao cần? `node:sqlite` trả về `unknown`, và **SQLite chỉ có 5 kiểu** (`NULL`, `INTEGER`, `REAL`, `TEXT`, `BLOB`) — không có boolean, không có date, không có enum. Cột `loai` khai là `TEXT` nên về mặt database, `'linh-tinh'` cũng hợp lệ. File `.db` lại có thể bị sửa tay, schema đổi qua thời gian. **Không có gì đảm bảo dữ liệu trong DB đúng như code mong đợi.**

---

## 6. Vòng đời một request

Đây là thứ đáng nhớ nhất — luồng lặp đi lặp lại trong mọi web app có OOP:

```
POST /api/robots/SN-1234/lam-viec
      │
      ├─ 1. đọc row từ SQLite            → dữ liệu phẳng, không method
      ├─ 2. Zod validate row              → chắc chắn đúng kiểu
      ├─ 3. Factory hồi sinh              → object SỐNG, đủ method
      ├─ 4. robot.lamViec()               → ⭐ đa hình: mỗi loại làm một kiểu
      ├─ 5. robot.toRow()                 → chọn field được đi ra
      ├─ 6. UPDATE xuống SQLite           → lưu state mới
      └─ 7. res.json(...)                 → trả về client (KHÔNG có maBiMat)
```

Bước 4 là chỗ **toàn bộ công sức học OOP được đền đáp**: server gọi `robot.lamViec()` mà **không cần biết** đang cầm loại robot nào. Thêm loại robot mới không phải sửa route.

> ⚠️ **Không bao giờ `res.json(robot)` thẳng!** Luôn đi qua `toRow()`. Đã kiểm chứng: response API không hề chứa `maBiMat`, và bảng SQL cũng không có cột nào tên đó.

---

## 7. Cấu trúc thư mục

```
robot-game/
  server/
    db.ts               node:sqlite — tạo bảng, PRAGMA foreign_keys
    schemas.ts          Zod — validate input client VÀ row từ DB
    RobotFactory.ts     ⭐ hồi sinh row → object sống
    RobotRepository.ts  ⭐ toàn bộ SQL nằm ở đây
    gameLoop.ts         vòng tick 3s, robot đang làm việc thì tụt pin
    server.ts           Express routes
  client/
    index.html          client 1 file, không cần build
  robot-game.db         SQLite (tự tạo khi chạy lần đầu)
```

**Vì sao gom hết SQL vào `RobotRepository.ts`?** Để phần còn lại của app chỉ làm việc với object `Robot`, không biết database tồn tại. Muốn đổi SQLite sang PostgreSQL thì chỉ sửa một file.

## 8. API

| Method | Route | Việc |
| --- | --- | --- |
| GET | `/api/robots` | Danh sách |
| POST | `/api/robots` | Tạo mới (Zod validate) |
| DELETE | `/api/robots/:serial` | Xoá (thống kê tự xoá theo CASCADE) |
| POST | `/api/robots/:serial/lam-viec` | Gọi `lamViec()` |
| POST | `/api/robots/:serial/charge` | Gọi `charge()` |
| POST | `/api/robots/:serial/dung` | Ngừng làm việc |
| POST | `/api/dau-truong` | 2 robot chiến đấu |
| GET | `/api/bang-xep-hang` | JOIN `robots` + `thong_ke` |
| GET | `/api/nhat-ky` | Nhật ký vòng tick |

Đấu trường dùng đúng interface `ICoTheChienDau` anh tự thêm vào [oop/interfaces.ts](oop/interfaces.ts). Sức mạnh phụ thuộc pin:

```ts
get sucManhHienTai(): number {
  return Math.round(this.sucTanCong * (this.pin / 100));
}
```

Nên robot pin yếu đánh yếu — buộc phải sạc trước khi đấu.

---

## 9. Bài học rút ra

| Bài học | Vì sao quan trọng |
| --- | --- |
| Object không tự lưu xuống DB được | Phải viết `toRow()` + Factory, không có đường tắt |
| `JSON.stringify(object)` gần như luôn sai | Mất `#private`, lộ `private` của TS, mất method |
| `private` của TS là lỗ hổng thật khi có API | Build xong thành property thường → lọt ra client |
| Rehydration phải nạp **đủ** state | Sót field nào là sai field đó (bẫy `taoLuc` ở trên) |
| Cột phân loại = discriminated union | Cho exhaustiveness check, DB và code không lệch |
| Validate cả dữ liệu **từ** DB | DB không đảm bảo kiểu; SQLite chỉ có 5 kiểu |
| Gom SQL vào một tầng | Đổi database chỉ sửa một file |

## 10. Học tiếp

1. **ORM** (Prisma, TypeORM, Drizzle) — chúng tự động hoá đúng phần `toRow()` + Factory anh vừa viết tay. Viết tay một lần rồi mới hiểu ORM làm gì bên trong.
2. **Transaction** — hiện `themMoi()` ghi 2 bảng (`robots` + `thong_ke`) mà không bọc transaction. Lỗi giữa chừng là dữ liệu lệch.
3. **Repository + Unit of Work** — hai design pattern chuyên cho tầng lưu trữ, nối tiếp [js-advance/design_pattern/](../js-advance/design_pattern)
4. **DTO** — `toRow()` chính là một dạng DTO thô sơ. Dự án lớn tách hẳn "kiểu lưu DB" và "kiểu trả API".
5. **WebSocket** — thay `setInterval` 2s ở client bằng server chủ động đẩy tick xuống.

## Tài liệu tham khảo

- [Martin Fowler — Single Table Inheritance](https://martinfowler.com/eaaCatalog/singleTableInheritance.html) và [Class Table Inheritance](https://martinfowler.com/eaaCatalog/classTableInheritance.html)
- [node:sqlite — tài liệu Node.js](https://nodejs.org/api/sqlite.html)
- [Express 5](https://expressjs.com/)
- [Zod](https://zod.dev)
