# OOP với TypeScript — 4 Tính Chất

_Mục thực hành nối tiếp [js-advance/design_pattern/0_Object_Oriented_Programing.md](../js-advance/design_pattern/0_Object_Oriented_Programing.md) (lý thuyết) và [doc.md mục 4.8](doc.md) (cú pháp class cơ bản)._

Code thực hành: thư mục [oop/](oop/) — 10 section trong [oop/main.ts](oop/main.ts), đánh số khớp doc này.

```bash
npx tsx oop/main.ts                  # chạy thẳng
npx tsc && node dist/oop/main.js     # hoặc build rồi chạy
```

## Cấu trúc thư mục

```
oop/
  interfaces.ts       ICoTheSac, ICoTheBay, ICoTheTuSua — hợp đồng năng lực
  Robot.ts            abstract class Robot — lớp cơ sở, gói phần lớn bài học
  RobotChienDau.ts    extends Robot implements ICoTheBay, ICoTheTuSua
  RobotYTe.ts         extends Robot implements ICoTheSac
  main.ts             demo 10 section
```

> **Lưu ý ESM:** import file nội bộ **bắt buộc ghi đuôi `.js`** dù file nguồn là `.ts` — `import { Robot } from './Robot.js'`. Thiếu là lỗi `TS2835`. Xem lại [doc.md mục 4.12](doc.md).

---

## OOP là gì, và giải quyết vấn đề gì?

OOP gom **dữ liệu** (thuộc tính) và **hành vi** (method) tác động lên dữ liệu đó vào cùng một chỗ gọi là **class**, thay vì để biến trôi nổi và hàm nằm rải rác.

- **Class** = khuôn đúc. `Robot` mô tả mọi robot đều có tên, có pin, đều làm việc được.
- **Object** = sản phẩm đúc ra từ khuôn. `new RobotChienDau(...)` là một object cụ thể.

Bốn tính chất bên dưới không phải là 4 thứ rời rạc phải học thuộc — chúng cùng phục vụ **một mục tiêu**: làm cho code **sửa được mà không sợ vỡ chỗ khác**.

---

## 1. Tính đóng gói (Encapsulation)

**Là gì:** che giấu dữ liệu bên trong, chỉ cho bên ngoài truy cập qua "cửa" mà mình kiểm soát.

TypeScript có 4 mức che giấu:

```ts
export abstract class Robot {
  public viTri: string = 'kho';        // ai cũng đọc/ghi được
  public readonly ten: string;         // đọc được, không ghi được
  protected nangLuong: number = 100;   // lớp này + lớp con
  private maBiMat: string;             // chỉ lớp này (compile-time)
  #serial: string;                     // chỉ lớp này (runtime THẬT)
}
```

### Lý do thật sự cần đóng gói

Không phải để "giấu cho bí ẩn", mà để **chặn dữ liệu vô lý ngay tại cửa**:

```ts
get pin(): number {
  return this.nangLuong;
}

set pin(giaTri: number) {
  if (giaTri < 0) return;                         // chặn số âm
  if (giaTri > 100) { this.nangLuong = 100; return; }  // cắt trần
  this.nangLuong = giaTri;
}
```

Nếu để `public nangLuong` thì bất cứ đâu trong codebase cũng gán được `nangLuong = -999`, và khi có bug anh phải đi tìm khắp nơi. Đóng gói xong thì **chỉ có một chỗ duy nhất** thay đổi được giá trị đó.

Chạy thử ở section 2:
```
bacSi.pin = -50   →  ⚠️ Pin khong the am, giu nguyen 100
bacSi.pin = 999   →  ⚠️ Pin toi da 100, tu dong cat xuong
bacSi.pin = 80    →  80 ✅
```

### ⚠️ `private` của TypeScript KHÔNG thật

Đây là điều quan trọng nhất trong cả doc này, và nối thẳng với mạch xuyên suốt các bài trước: **TS biến mất lúc runtime**.

`private` chỉ là quy ước lúc compile. Build ra JS thì từ khoá bị xoá, **property vẫn còn nguyên như biến thường**:

```js
// dist/oop/Robot.js — dòng 47, đã build thật
this.maBiMat = `SECRET-${serial}`;   // ← không còn chữ `private` nào
```

Nên lách qua `any` là đọc được:

```
Doc private cua TS qua any:  SECRET-SN-1234-5678   ← vẫn đọc được!
Doc #serial qua any:         undefined              ← không lách được
```

Kiểm chứng bằng JS thuần, không qua TS:

```js
const r = new RobotChienDau('Test', 'SN-AAAA-BBBB', 10);
r.maBiMat; // => 'SECRET-SN-AAAA-BBBB'  😱
r.serial; // => undefined
```

**Kết luận: cần bảo mật thật thì dùng `#`, không dùng `private` của TS.** `private` chỉ để chống nhầm lẫn khi code, không chống được kẻ cố tình.

### Bảng so sánh 4 mức

| Mức | Bên ngoài | Lớp con | Còn lúc runtime? |
| --- | --- | --- | --- |
| `public` | ✅ | ✅ | ✅ |
| `protected` | ❌ | ✅ | ❌ (chỉ compile-time) |
| `private` | ❌ | ❌ | ❌ **(bị xoá — đọc được!)** |
| `#field` | ❌ | ❌ | ✅ **(chặn thật)** |
| `readonly` | đọc ✅ ghi ❌ | đọc ✅ ghi ❌ | ❌ (chỉ compile-time) |

> **Chi tiết build:** dự án này để `target: ES2020`, mà `#private` là tính năng ES2022 — nên tsc **hạ cấp** nó thành `WeakMap` (`_Robot_serial = new WeakMap()`). Vẫn chặn thật lúc chạy, chỉ là code sinh ra dài hơn. Đổi `target` lên `ES2022` thì `#` được giữ nguyên.

---

## 2. Tính kế thừa (Inheritance)

**Là gì:** lớp con nhận lại toàn bộ thuộc tính và method của lớp cha, khỏi viết lại.

```ts
export class RobotChienDau extends Robot implements ICoTheBay, ICoTheTuSua {
  constructor(ten: string, serial: string, sucTanCong: number) {
    super(ten, serial); // PHẢI gọi trước khi dùng `this`
    this.sucTanCong = sucTanCong;
  }
}
```

`RobotChienDau` không hề định nghĩa `khoiDong()`, `tieuHaoPin()` hay `charge()`, nhưng gọi được — vì kế thừa từ `Robot`.

### Ví dụ: `charge()` — viết một lần, mọi robot đều có

```ts
// Trong abstract class Robot
charge(luong: number): string {
  if (luong <= 0) {
    return `  ⚠️  [${this.ten}] Luong nap phai lon hon 0`;
  }
  const pinTruocKhiNap = this.nangLuong;

  // Gán qua setter `pin` -> tự động bị cắt trần ở 100.
  // KHÔNG cần tự kiểm tra lại ở đây.
  this.pin = this.nangLuong + luong;

  return `  🔌 [${this.ten}] Nap ${luong}%: ${pinTruocKhiNap}% -> ${this.nangLuong}%`;
}
```

Kết quả — robot chiến đấu, robot y tế, robot vệ sinh đều dùng được ngay:
```
🔌 [Optimus] Nap 25%: 40% -> 65%
🔌 [Nightingale] Nap 15%: 80% -> 95%
```

**Để ý điểm hay:** `charge()` **không hề tự kiểm tra** pin có vượt 100 không. Nó chỉ gán qua setter, và setter lo phần đó:

```
chienBinh.charge(999)
  →  ⚠️  Pin toi da 100, tu dong cat xuong     ← setter chặn
  →  🔌 Nap 999%: 65% -> 100%
```

Luật *"pin không quá 100"* nằm ở **đúng một chỗ duy nhất**. Sau này muốn đổi trần lên 150 thì sửa mỗi setter, mọi method gọi tới đều tự đúng theo. Đây là lý do đóng gói và kế thừa đi cùng nhau.

### Lớp con dùng lại method của cha thay vì chép lại

`RobotYTe` phải cài đặt `sac()` theo hợp đồng `ICoTheSac`. Thay vì viết lại logic nạp pin, nó gọi thẳng `charge()` rồi thêm phần riêng:

```ts
sac(luong: number): string {
  return `${this.charge(luong)} 🔋 (sac nhanh chuyen dung y te)`;
}
```

### Override để MỞ RỘNG, không phải thay thế

Dùng `super.method()` để gọi lại bản của lớp cha rồi thêm phần riêng vào:

```ts
override moTa(): string {
  return `${super.moTa()} | Suc tan cong: ${this.sucTanCong}`;
}
```

Kết quả: `Robot "Optimus" (Chien dau) - serial ****5678 | Suc tan cong: 95, tran bay 800m`

> Từ khoá `override` không bắt buộc nhưng **nên viết** — nó khiến TS báo lỗi nếu anh gõ sai tên method định override (bật cờ `noImplicitOverride` thì thành bắt buộc).

### Quan hệ "là một" (is-a)

Kế thừa chỉ đúng khi lớp con thật sự **là một** lớp cha: `RobotChienDau` **là một** `Robot` ✅. Còn `DongCoBay` thì **không phải là một** `Robot` — nó là **bộ phận của** robot, nên phải dùng composition (mục 10).

---

## 3. Tính đa hình (Polymorphism) ⭐

**Là gì:** cùng một lời gọi method, mỗi object tự chạy phiên bản của riêng nó.

Đây là tính chất **có giá trị thực tế lớn nhất**, nhưng cũng khó thấy giá trị nhất nếu chỉ nhìn cú pháp.

```ts
const doiRobot: Robot[] = [chienBinh, bacSi];

doiRobot.forEach((robot) => {
  console.log(robot.lamViec()); // vòng lặp KHÔNG biết đang cầm robot loại gì
});
```

Kết quả — cùng `lamViec()` nhưng mỗi loại làm một kiểu:
```
⚔️  [Optimus] Tan cong muc tieu! Suc manh 95
🏥 [Nightingale] Dang kham benh (Noi tong quat) - benh nhan thu 1
```

### Vì sao đây là điểm mấu chốt

Thêm một loại robot hoàn toàn mới:

```ts
class RobotVeSinh extends Robot {
  lamViec(): string {
    return `🧹 [${this.ten}] Dang quet don khu vuc`;
  }
  get loai(): string {
    return 'Ve sinh';
  }
}
doiRobot.push(new RobotVeSinh('Rumba', 'SN-1111-2222'));
```

**Vòng lặp bên trên không phải sửa một dòng nào.** Nó chạy đúng với loại robot chưa từng tồn tại lúc nó được viết.

So sánh với cách viết không dùng đa hình:

```ts
// ❌ Không đa hình — thêm loại mới là phải sửa hàm này, và mọi hàm tương tự
function lamViec(robot: any) {
  if (robot.loai === 'chien dau') return 'tan cong...';
  else if (robot.loai === 'y te') return 'kham benh...';
  else if (robot.loai === 've sinh') return 'quet don...'; // ← phải thêm dòng này
}
```

Đa hình biến việc **sửa code cũ** thành việc **thêm code mới** — an toàn hơn hẳn.

---

## 4. Tính trừu tượng (Abstraction)

**Là gì:** chỉ phơi ra cái *"làm được gì"*, giấu đi cái *"làm thế nào"*.

```ts
export abstract class Robot {
  abstract lamViec(): string; // không có thân hàm
  abstract get loai(): string;

  khoiDong(): string {
    // method thường vẫn có thân, lớp con dùng lại
    return `[${this.ten}] Khoi dong... pin ${this.nangLuong}%`;
  }
}
```

Hai hệ quả:

**1. Không tạo object trực tiếp được** — robot "chung chung" không tồn tại ngoài đời:
```ts
new Robot('Chung chung', 'SN-0000');
// ❌ TS2511: Cannot create an instance of an abstract class.
```

**2. Lớp con bắt buộc phải cài đặt** — quên là lỗi compile ngay:
```ts
class RobotHong extends Robot {}
// ❌ TS2654: Non-abstract class 'RobotHong' is missing implementations
//    for the following members of 'Robot': 'lamViec', 'loai'.
```

Compiler ép anh không thể quên. Đây là điểm TypeScript hơn hẳn JavaScript thuần.

### Lập trình theo cái trừu tượng

Hàm dưới đây nhận `Robot[]` — nó **không cần biết** có bao nhiêu loại robot tồn tại:

```ts
function dieuHanhCa(dsRobot: Robot[]): string[] {
  return dsRobot
    .filter((robot) => robot.pin > 20)
    .map((robot) => `${robot.loai}: ${robot.lamViec()}`);
}
```

Nó chỉ dựa vào "hợp đồng" mà `Robot` hứa: có `pin`, có `loai`, có `lamViec()`.

---

## 5. `abstract class` vs `interface` — câu hỏi phỏng vấn kinh điển

| | `abstract class` | `interface` |
| --- | --- | --- |
| Chứa code thật (thân method) | ✅ | ❌ chỉ khai báo |
| Chứa thuộc tính có giá trị | ✅ | ❌ |
| Có constructor | ✅ | ❌ |
| Một class dùng được mấy cái | **1** (`extends`) | **nhiều** (`implements`) |
| Còn tồn tại lúc runtime | ✅ | ❌ **biến mất sạch** |
| `instanceof` dùng được | ✅ | ❌ |

**Khi nào dùng cái nào:**

- **`abstract class`** — khi các lớp con **cùng loại** và có **code dùng chung**. `Robot` là ví dụ: mọi robot đều có pin, đều khởi động giống nhau.
- **`interface`** — khi mô tả một **năng lực** mà nhiều loại khác hẳn nhau đều có thể có. `ICoTheBay` gắn được cho robot, cho máy bay, cho chim — chúng chẳng liên quan gì nhau.

```ts
// Một class: 1 lớp cha + bao nhiêu năng lực cũng được
class RobotChienDau extends Robot implements ICoTheBay, ICoTheTuSua {}
```

> **Vì interface biến mất lúc runtime nên không `instanceof` được.** Muốn lọc theo năng lực phải dùng type guard tự viết ([advanced.md mục 10](advanced.md)):
> ```ts
> function coTheBay(robot: Robot): robot is Robot & ICoTheBay {
>   return 'bay' in robot;
> }
> ```

---

## 6. `static` — thuộc về lớp, không thuộc object

```ts
private static demSoRobot: number = 0;

static tongSoRobot(): number {
  return Robot.demSoRobot;
}
```

`demSoRobot` **dùng chung** cho toàn bộ chương trình, không phải mỗi robot một bản. Gọi qua **tên lớp**:

```ts
Robot.tongSoRobot(); // ✅
chienBinh.tongSoRobot();
// ❌ TS2576: Property 'tongSoRobot' does not exist on type 'RobotChienDau'.
//    Did you mean to access the static member 'RobotChienDau.tongSoRobot'?
```

---

## 7. Composition over Inheritance — đừng lạm dụng kế thừa

Lời khuyên quan trọng nhất về OOP thực chiến.

**Cái bẫy:** chuỗi kế thừa càng sâu càng khó sửa.

```
Robot → RobotBay → RobotBayChienDau → RobotBayChienDauCoSung → ...
```

Sửa lớp trên cùng là vỡ hết lớp dưới. Và muốn một robot **vừa bay vừa chữa bệnh** thì kẹt cứng — chỉ `extends` được **một** lớp cha.

**Cách làm tốt hơn:** lắp ghép từ các mảnh nhỏ độc lập — quan hệ **"có một" (has-a)** thay vì **"là một" (is-a)**:

```ts
class DongCoBay {
  kichHoat(): string { ... }
}
class BoSoCuu {
  boSung(): string { ... }
}

class RobotDaNang extends Robot {
  private dongCo = new DongCoBay(500); // CHỨA, không kế thừa
  private soCuu = new BoSoCuu();

  lamViec(): string {
    return `${this.dongCo.kichHoat()}, ${this.soCuu.boSung()}`;
  }
}
```

Muốn thêm năng lực thì lắp thêm một mảnh, không phải đẻ thêm một tầng kế thừa.

> Quy tắc gọn: **"là một" thì `extends`, "có một" thì để làm thuộc tính.** Robot chiến đấu **là một** robot ✅. Động cơ bay **không phải là một** robot — nó là **bộ phận của** robot.

---

## Bảng tra nhanh

| Từ khoá | Ý nghĩa |
| --- | --- |
| `class` | Khuôn đúc object |
| `extends` | Kế thừa (chỉ 1 lớp cha) |
| `implements` | Cam kết theo interface (bao nhiêu cũng được) |
| `abstract class` | Lớp khuôn mẫu, không `new` được |
| `abstract method()` | Không có thân, lớp con bắt buộc cài đặt |
| `super(...)` | Gọi constructor lớp cha |
| `super.method()` | Gọi method bản gốc của lớp cha |
| `override` | Đánh dấu đang ghi đè (nên viết) |
| `public` / `protected` / `private` | Mức truy cập (compile-time) |
| `#field` | Private thật, runtime chặn thật |
| `readonly` | Chỉ gán trong constructor |
| `static` | Thuộc về lớp, không thuộc object |
| `get` / `set` | Truy cập có kiểm soát |
| `constructor(public x: T)` | Parameter property — tự gán `this.x = x` |

## Sai lầm thường gặp

| Sai lầm | Nên làm |
| --- | --- |
| Tưởng `private` của TS bảo mật thật | Bị xoá khi build, đọc được qua `any`. Cần thật thì dùng `#` |
| Kế thừa sâu 4–5 tầng | Dùng composition. "Có một" thì làm thuộc tính, đừng `extends` |
| `extends` khi quan hệ không phải "là một" | Động cơ không **là một** robot — nó là **bộ phận** |
| Để thuộc tính `public` hết rồi validate ở ngoài | Đóng gói + setter, chặn tại một cửa duy nhất |
| Dùng `instanceof` với interface | Interface biến mất lúc runtime. Viết type guard `'bay' in robot` |
| Quên `super()` trước khi dùng `this` | Lỗi compile. `super()` luôn phải đứng đầu constructor |
| Dùng `if/else` theo `loai` thay vì đa hình | Thêm loại mới là phải sửa mọi chỗ. Override method thay vì rẽ nhánh |

## Học tiếp

OOP là nền cho **design pattern** — và repo này đã có sẵn phần đó bằng JS:

- [js-advance/design_pattern/1_Intro_design_pattern.md](../js-advance/design_pattern/1_Intro_design_pattern.md)
- [js-advance/design_pattern/2_Singleton_Pattern.md](../js-advance/design_pattern/2_Singleton_Pattern.md) — dùng `private constructor` + `static`, khớp đúng mục 6 ở trên
- [js-advance/design_pattern/3_Module_Pattern.md](../js-advance/design_pattern/3_Module_Pattern.md)

Hướng đi tiếp:

1. **SOLID** — 5 nguyên tắc thiết kế OOP, đặc biệt Liskov (khi nào kế thừa mới đúng) và Dependency Inversion (phụ thuộc vào interface, không phụ thuộc class cụ thể)
2. **Design pattern bằng TS** — viết lại Singleton/Factory/Strategy có type đầy đủ
3. **Generic class** — `class Kho<T>` kết hợp OOP với generic ở [doc.md mục 4.7](doc.md)

## Tài liệu tham khảo

- [TypeScript Handbook — Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [MDN — Private class fields (`#`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
- [refactoring.guru — Design Patterns](https://refactoring.guru/design-patterns) — có bản tiếng Việt, hình minh hoạ dễ hiểu
