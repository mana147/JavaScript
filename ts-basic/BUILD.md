# Hướng dẫn Build & Chạy

_Áp dụng cho toàn bộ `ts-basic/`. Mọi lệnh chạy **từ thư mục `ts-basic/`**._

---

## Tóm tắt nhanh

```bash
cd ts-basic
npm install              # lần đầu

npm run typecheck        # kiểm lỗi, KHÔNG sinh file
npm run build            # biên dịch .ts -> dist/
npm run game             # chạy game (dev, không cần build)
```

| Lệnh | Làm gì | Sinh file? |
| --- | --- | --- |
| `npm run typecheck` | `tsc --noEmit` — chỉ kiểm lỗi | ❌ |
| `npm run build` | `tsc` — biên dịch ra `dist/` | ✅ |
| `npm run start` | `tsx demo.ts` | ❌ |
| `npm run dev` | `tsx watch demo.ts` — tự chạy lại khi sửa | ❌ |
| `npm run game` | `tsx robot-game/server/server.ts` | ❌ (tạo file `.db`) |

---

## 1. Hai cách chạy — dùng cái nào khi nào

### `tsx` — chạy thẳng file `.ts`, không sinh file

```bash
npx tsx demo.ts
npx tsx oop/main.ts
npx tsx robot-game/server/server.ts
```

Dùng khi **đang học và sửa code**. Nhanh, không rác.

> ⚠️ `tsx` **không kiểm tra type**. Nó chỉ bóc type đi rồi chạy. Code sai type vẫn chạy tuốt. Nên thỉnh thoảng phải `npm run typecheck` riêng.

### `tsc` — biên dịch ra JavaScript rồi chạy bằng `node`

```bash
npm run build
node dist/demo.js
node dist/oop/main.js
node dist/robot-game/server/server.js
```

Dùng khi muốn **giống môi trường production**, hoặc muốn xem TypeScript sinh ra JS thế nào.

---

## 2. `tsc` biên dịch những gì

`tsconfig.json` có `"include": ["**/*.ts"]` (đệ quy) và `"rootDir": "./"` → **cấu trúc thư mục được giữ nguyên** trong `dist/`:

```
demo.ts                          →  dist/demo.js
oop/Robot.ts                     →  dist/oop/Robot.js
robot-game/server/server.ts      →  dist/robot-game/server/server.js
```

**Quan trọng — `tsc` CHỈ biên dịch `.ts`:**

```
robot-game/client/index.html     →  ❌ KHÔNG được copy sang dist/
```

File HTML, CSS, ảnh... `tsc` không đụng tới. Đây là điều nhiều người mới bị bất ngờ. Dự án thật giải quyết bằng bundler (Vite, webpack) hoặc lệnh copy riêng.

---

## 3. ⚠️ Phải chạy từ thư mục `ts-basic/`

Server dùng `process.cwd()` để tìm 2 thứ:

```ts
// db.ts
path.join(process.cwd(), 'robot-game', 'robot-game.db')

// server.ts
express.static(path.join(process.cwd(), 'robot-game', 'client'))
```

`process.cwd()` là **thư mục anh gõ lệnh**, không phải thư mục chứa file. Nên:

```bash
# ✅ ĐÚNG
cd ts-basic
node dist/robot-game/server/server.js

# ❌ SAI — chạy từ thư mục cha
cd ..
node ts-basic/dist/robot-game/server/server.js
```

Chạy sai chỗ sẽ gặp đúng lỗi này (đã test thật):

```
Error: unable to open database file
  code: 'ERR_SQLITE_ERROR'
```

Vì `process.cwd()` thành `JavaScript/`, nên nó đi tìm `JavaScript/robot-game/` — không tồn tại.

> Cách này đơn giản, hợp để học. Dự án thật nên resolve theo `import.meta.url` (vị trí file) thay vì `cwd`, hoặc đọc đường dẫn từ biến môi trường.

---

## 4. Chạy game

```bash
npm run game
# mở http://localhost:3000
```

Hoặc sau khi build:

```bash
npm run build
node dist/robot-game/server/server.js
```

**Cả hai đều chạy được** (đã test: `GET /` → 200, `POST /api/robots` → 201) vì client HTML được đọc từ thư mục nguồn `robot-game/client/`, không phải từ `dist/`.

Đổi cổng:

```bash
PORT=4000 npm run game
```

Chơi lại từ đầu — xoá database, nó tự tạo lại:

```bash
rm robot-game/robot-game.db
```

> Dòng `ExperimentalWarning: SQLite is an experimental feature` là **bình thường**, không phải lỗi. `node:sqlite` vẫn đang thử nghiệm trong Node 22.

---

## 5. Cấu hình đáng chú ý trong `tsconfig.json`

```json
{
  "target": "ES2020",
  "module": "NodeNext",
  "moduleResolution": "NodeNext",
  "outDir": "./dist",
  "rootDir": "./",
  "strict": true,
  "types": ["node"]
}
```

Hai dòng dễ gây lỗi nhất:

**`module`/`moduleResolution: NodeNext`** phải khớp với `"type": "module"` trong `package.json`. Lệch nhau là gặp `SyntaxError: Unexpected token 'export'` khi chạy `node dist/...`. Chi tiết ở [doc.md mục 2.5](doc.md).

Hệ quả: import file nội bộ **bắt buộc ghi đuôi `.js`**, kể cả khi file nguồn là `.ts`:

```ts
import { Robot } from './Robot.js';   // ✅
import { Robot } from './Robot';      // ❌ TS2835
```

**`types: ["node"]`** — TypeScript 7 không tự nạp `@types/node`. Thiếu dòng này thì `process`, `node:path`, `node:sqlite` đều báo `TS2591`. (`console` vẫn chạy vì nó đến từ lib DOM mặc định — nên lỗi này chỉ lộ ra khi bắt đầu dùng module của Node.)

---

## 6. Lỗi thường gặp

| Lỗi | Nguyên nhân |
| --- | --- |
| `SyntaxError: Unexpected token 'export'` | `tsconfig.module` lệch với `package.json type`. Xem [doc.md 2.5](doc.md) |
| `TS2835: Relative import paths need explicit file extensions` | Thiếu đuôi `.js` khi import file nội bộ |
| `TS2591: Cannot find name 'process'` | Thiếu `"types": ["node"]` trong tsconfig |
| `ERR_SQLITE_ERROR: unable to open database file` | Chạy sai thư mục — phải `cd ts-basic` trước |
| `EADDRINUSE: address already in use :::3000` | Server cũ còn chạy. `pkill -f robot-game` hoặc đổi `PORT` |
| Sửa code mà chạy `node dist/...` không thấy đổi | Quên `npm run build`. `tsx` thì không cần |

---

## 7. Nên bỏ qua khi commit

`.gitignore` ở gốc repo hiện chỉ có `node_modules/` và `js-test/`. Nên thêm:

```
dist/
*.db
```

`dist/` là file sinh ra từ `.ts`, build lại lúc nào cũng được. `*.db` là dữ liệu chơi game, không phải mã nguồn.
