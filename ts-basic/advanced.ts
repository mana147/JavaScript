/**
 * DEMO TYPESCRIPT NÂNG CAO
 * ------------------------
 * Học sau khi đã nắm demo.ts
 *
 * Chạy nhanh:  npx tsx advanced.ts
 * Hoặc build:  npx tsc && node dist/advanced.js
 *
 * Xem giải thích chi tiết trong file advanced.md
 */

// Kiểu dùng chung cho cả file
interface SanPham {
  id: number;
  ten: string;
  gia: number;
  tonKho: boolean;
}

const laptop: SanPham = { id: 1, ten: 'Dell Vostro', gia: 12000000, tonKho: true };

// =====================================================================
// 1. keyof — lấy ra union các KEY của một type
// =====================================================================

// keyof SanPham  =>  'id' | 'ten' | 'gia' | 'tonKho'
type KeySanPham = keyof SanPham;

const cacKey: KeySanPham[] = ['id', 'ten', 'gia', 'tonKho'];
// const sai: KeySanPham = 'mauSac';   // ❌ Error: không có key này

// Ứng dụng kinh điển: hàm lấy field an toàn.
// K bị ràng buộc phải là key của T, và trả về đúng kiểu của field đó.
function layField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const ten = layField(laptop, 'ten'); // TS hiểu: string
const gia = layField(laptop, 'gia'); // TS hiểu: number
// layField(laptop, 'mauSac');        // ❌ Error: 'mauSac' không phải key của SanPham

console.log('--- 1. keyof ---');
console.log(cacKey, '|', ten, '|', gia);

// =====================================================================
// 2. typeof — lấy TYPE từ một GIÁ TRỊ đã có
// =====================================================================

// Lưu ý: đây là `typeof` ở tầng TYPE, khác với `typeof` lúc runtime trong JS
const cauHinhMacDinh = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  debug: false,
};

// Thay vì ngồi gõ lại interface, để TS tự suy ra từ object có sẵn
type CauHinh = typeof cauHinhMacDinh;
// => { apiUrl: string; timeout: number; debug: boolean }

const cauHinhTest: CauHinh = {
  apiUrl: 'http://localhost:3000',
  timeout: 1000,
  debug: true,
};

// Kết hợp keyof + typeof — mẫu cực hay dùng
type KeyCauHinh = keyof typeof cauHinhMacDinh; // 'apiUrl' | 'timeout' | 'debug'

console.log('--- 2. typeof ---');
console.log(cauHinhTest.apiUrl, '|', cauHinhTest.timeout);

// =====================================================================
// 3. INDEXED ACCESS — lấy type của một field bằng cú pháp T['key']
// =====================================================================

type KieuGia = SanPham['gia']; // number
type KieuIdTen = SanPham['id' | 'ten']; // number | string

// Lấy kiểu phần tử của một mảng bằng [number]
const danhSachMau = ['do', 'xanh', 'vang'] as const;
type Mau = (typeof danhSachMau)[number]; // 'do' | 'xanh' | 'vang'

const mauChon: Mau = 'xanh';
// const mauSai: Mau = 'tim';   // ❌ Error

console.log('--- 3. Indexed Access ---');
console.log(mauChon, '|', danhSachMau.join(', '));

// =====================================================================
// 4. MAPPED TYPES — duyệt qua từng key để tạo type mới
// =====================================================================

// Cú pháp: { [K in keyof T]: <kiểu mới> }
// Đây chính là cách Partial, Readonly... được viết trong thư viện chuẩn

// Tự viết lại Partial
type TuPartial<T> = {
  [K in keyof T]?: T[K];
};

// Tự viết lại Readonly
type TuReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Biến mọi field thành string (ví dụ: object chứa message lỗi cho từng field)
type LoiCuaForm<T> = {
  [K in keyof T]?: string;
};

const loiForm: LoiCuaForm<SanPham> = {
  ten: 'Ten khong duoc de trong',
  gia: 'Gia phai lon hon 0',
};

// Modifier: dấu `-` để GỠ BỎ optional / readonly
type BatBuocHet<T> = {
  [K in keyof T]-?: T[K]; // -? = gỡ dấu ?
};

type BoReadonly<T> = {
  -readonly [K in keyof T]: T[K]; // -readonly = gỡ readonly
};

const sanPhamMoi: TuPartial<SanPham> = { ten: 'Chuot khong day' };

console.log('--- 4. Mapped Types ---');
console.log(loiForm, '|', sanPhamMoi);

// =====================================================================
// 5. KEY REMAPPING — đổi luôn TÊN key bằng `as`
// =====================================================================

// Cú pháp: { [K in keyof T as <tên mới>]: ... }

// Tạo type chỉ giữ lại các key là string (loại bỏ số/symbol)
type ChiKeyString<T> = {
  [K in keyof T as K extends string ? K : never]: T[K];
};

// Lọc bỏ field theo điều kiện: trả về `never` thì key đó BỊ LOẠI
type BoField<T, KeyCanBo extends keyof T> = {
  [K in keyof T as K extends KeyCanBo ? never : K]: T[K];
};

type SanPhamKhongId = BoField<SanPham, 'id'>; // { ten, gia, tonKho }

const spKhongId: SanPhamKhongId = { ten: 'Ban phim', gia: 500000, tonKho: true };

console.log('--- 5. Key Remapping ---');
console.log(spKhongId);

// =====================================================================
// 6. TEMPLATE LITERAL TYPES — ghép chuỗi ở tầng type
// =====================================================================

type Mau2 = 'primary' | 'danger';
type KichThuoc = 'sm' | 'md' | 'lg';

// TS nhân chéo mọi tổ hợp: 2 x 3 = 6 giá trị hợp lệ
type ClassButton = `btn-${Mau2}-${KichThuoc}`;
// => 'btn-primary-sm' | 'btn-primary-md' | ... | 'btn-danger-lg'

const classNut: ClassButton = 'btn-primary-lg';
// const classSai: ClassButton = 'btn-primary-xl';   // ❌ Error

// 4 helper có sẵn: Uppercase, Lowercase, Capitalize, Uncapitalize
type SuKien = 'click' | 'focus';
type TenHandler = `on${Capitalize<SuKien>}`; // 'onClick' | 'onFocus'

const tenHandler: TenHandler = 'onClick';

console.log('--- 6. Template Literal ---');
console.log(classNut, '|', tenHandler);

// =====================================================================
// 7. MAPPED + TEMPLATE LITERAL — kết hợp lại thì rất mạnh
// =====================================================================

// Sinh tự động type có đủ getter cho mọi field
type Getters<T> = {
  [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];
};

// Getters<SanPham> tương đương với:
// { getId: () => number; getTen: () => string; getGia: () => number; getTonKho: () => boolean }
const sanPhamGetters: Getters<SanPham> = {
  getId: () => laptop.id,
  getTen: () => laptop.ten,
  getGia: () => laptop.gia,
  getTonKho: () => laptop.tonKho,
};

console.log('--- 7. Mapped + Template ---');
console.log(sanPhamGetters.getTen(), '|', sanPhamGetters.getGia());

// =====================================================================
// 8. CONDITIONAL TYPES — if/else ở tầng type
// =====================================================================

// Cú pháp: T extends U ? X : Y   ("nếu T gán được vào U thì X, không thì Y")

type LaMang<T> = T extends unknown[] ? 'la mang' : 'khong phai mang';

type KetQua1 = LaMang<string[]>; // 'la mang'
type KetQua2 = LaMang<number>; // 'khong phai mang'

// Ứng dụng thật: bỏ null/undefined khỏi một union
type BoRong<T> = T extends null | undefined ? never : T;
type ChacChanCoChuoi = BoRong<string | null | undefined>; // string

// Conditional type PHÂN PHỐI qua union một cách tự động.
// BoRong<string | null> được TS tính từng nhánh:
//   BoRong<string> | BoRong<null>  =>  string | never  =>  string

const chuoiChacChan: ChacChanCoChuoi = 'khong bao gio null';
const kq1: KetQua1 = 'la mang';

console.log('--- 8. Conditional Types ---');
console.log(chuoiChacChan, '|', kq1);

// =====================================================================
// 9. infer — "bắt" một type ra từ bên trong type khác
// =====================================================================

// infer chỉ dùng được bên trong conditional type.
// Ý nghĩa: "chỗ này là kiểu gì đó, đặt tên cho nó là U rồi trả U về cho tôi"

// Lấy kiểu phần tử của mảng
type PhanTuCua<T> = T extends (infer U)[] ? U : T;
type P1 = PhanTuCua<string[]>; // string
type P2 = PhanTuCua<SanPham[]>; // SanPham
type P3 = PhanTuCua<number>; // number (không phải mảng thì trả về chính nó)

// Lấy kiểu trả về của hàm — đây chính là ReturnType có sẵn
type KieuTraVeCua<T> = T extends (...args: never[]) => infer R ? R : never;

function taoSanPham(ten: string, gia: number): SanPham {
  return { id: Date.now(), ten, gia, tonKho: true };
}

type KieuTraVeTaoSanPham = KieuTraVeCua<typeof taoSanPham>; // SanPham

// Bóc kiểu bên trong Promise — đây chính là Awaited có sẵn
type BocPromise<T> = T extends Promise<infer U> ? U : T;
type B1 = BocPromise<Promise<string>>; // string

const phanTu: P1 = 'toi la phan tu cua string[]';
const spTao: KieuTraVeTaoSanPham = taoSanPham('Man hinh', 3000000);

console.log('--- 9. infer ---');
console.log(phanTu, '|', spTao.ten, spTao.gia);

// =====================================================================
// 10. TYPE GUARD TỰ VIẾT — dạy TS cách nhận biết kiểu
// =====================================================================

// Vấn đề: dữ liệu từ API về là `unknown`, TS không cho đụng vào.
// Giải pháp: viết hàm trả về `x is T` — gọi là type predicate.
// Nếu hàm trả true, TS TIN rằng x có kiểu T trong nhánh đó.

function laSanPham(x: unknown): x is SanPham {
  return (
    typeof x === 'object' &&
    x !== null &&
    'id' in x &&
    'ten' in x &&
    typeof (x as SanPham).id === 'number' &&
    typeof (x as SanPham).ten === 'string'
  );
}

function xuLyDuLieuApi(duLieu: unknown): string {
  if (laSanPham(duLieu)) {
    // trong block này TS đã coi duLieu là SanPham, gợi ý đầy đủ .ten, .gia
    return `San pham hop le: ${duLieu.ten} - ${duLieu.gia}`;
  }
  return 'Du lieu khong dung dinh dang san pham';
}

// Type guard cho mảng
function laMangSanPham(x: unknown): x is SanPham[] {
  return Array.isArray(x) && x.every(laSanPham);
}

console.log('--- 10. Type Guard ---');
console.log(xuLyDuLieuApi(laptop));
console.log(xuLyDuLieuApi({ linh: 'tinh' }));
console.log('La mang san pham?', laMangSanPham([laptop, laptop]));

// =====================================================================
// 11. ASSERTION FUNCTION — `asserts x is T`
// =====================================================================

// Khác type guard: không trả về boolean mà THROW nếu sai.
// Sau khi gọi xong, TS coi như biến đã đúng kiểu ở TOÀN BỘ phần còn lại.

function khangDinhLaSanPham(x: unknown): asserts x is SanPham {
  if (!laSanPham(x)) {
    throw new Error('Du lieu khong phai SanPham');
  }
}

function inTenSanPham(duLieu: unknown): string {
  khangDinhLaSanPham(duLieu);
  // từ dòng này trở đi TS coi duLieu là SanPham, không cần bọc if
  return duLieu.ten;
}

console.log('--- 11. Assertion Function ---');
console.log(inTenSanPham(laptop));
try {
  inTenSanPham('chuoi lung tung');
} catch (err) {
  // trong catch, err có kiểu unknown -> phải narrow trước khi dùng
  console.log('Bat duoc loi:', err instanceof Error ? err.message : 'khong ro');
}

// =====================================================================
// 12. DISCRIMINATED UNION — mẫu quan trọng nhất của phần nâng cao
// =====================================================================

// Ý tưởng: mỗi nhánh của union có chung MỘT field literal để phân biệt
// (ở đây là `trangThai`). TS dựa vào field đó để narrow cực chính xác.

type TrangThaiTai<T> =
  | { trangThai: 'idle' }
  | { trangThai: 'loading' }
  | { trangThai: 'success'; duLieu: T }
  | { trangThai: 'error'; loi: string };

function hienThi(state: TrangThaiTai<SanPham>): string {
  switch (state.trangThai) {
    case 'idle':
      return 'Chua tai gi ca';
    case 'loading':
      return 'Dang tai...';
    case 'success':
      // chỉ nhánh này mới có .duLieu, TS biết điều đó
      return `Da tai xong: ${state.duLieu.ten}`;
    case 'error':
      // chỉ nhánh này mới có .loi
      return `Loi: ${state.loi}`;
    default:
      return khongBaoGioToiDay(state);
  }
}

// Exhaustiveness check: nếu sau này thêm nhánh mới vào TrangThaiTai
// mà quên xử lý, TS sẽ báo lỗi NGAY tại dòng này. Rất đáng để viết.
function khongBaoGioToiDay(x: never): never {
  throw new Error('Truong hop chua duoc xu ly: ' + JSON.stringify(x));
}

console.log('--- 12. Discriminated Union ---');
console.log(hienThi({ trangThai: 'idle' }));
console.log(hienThi({ trangThai: 'loading' }));
console.log(hienThi({ trangThai: 'success', duLieu: laptop }));
console.log(hienThi({ trangThai: 'error', loi: 'Mat ket noi' }));

// =====================================================================
// 13. satisfies — kiểm tra mà KHÔNG làm mất type cụ thể
// =====================================================================

// Dùng `:` -> an toàn nhưng type bị "rộng" ra
const bangMau1: Record<string, string> = { do: '#f00', xanh: '#0f0' };
// bangMau1.tim  -> TS cho qua vì key là string bất kỳ, nhưng runtime là undefined!

// Dùng `satisfies` -> vừa check đúng shape, vừa giữ nguyên type cụ thể
const bangMau2 = {
  do: '#f00',
  xanh: '#0f0',
} satisfies Record<string, string>;

// bangMau2.tim;   // ❌ Error — TS biết chính xác chỉ có 'do' | 'xanh'
type KeyMau = keyof typeof bangMau2; // 'do' | 'xanh'

const keyMau: KeyMau = 'do';

console.log('--- 13. satisfies ---');
console.log(bangMau1.do, '|', bangMau2.xanh, '|', keyMau);

// =====================================================================
// 14. GHÉP TẤT CẢ LẠI — ví dụ thực tế
// =====================================================================

// Giả lập gọi API có kiểu chặt chẽ từ đầu tới cuối
async function taiSanPham(id: number): Promise<TrangThaiTai<SanPham>> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 50));

    // giả lập response thô, kiểu unknown như đời thật
    const thoDuLieu: unknown = { id, ten: 'San pham ' + id, gia: 99000, tonKho: true };

    // validate trước khi tin
    if (!laSanPham(thoDuLieu)) {
      return { trangThai: 'error', loi: 'Response sai dinh dang' };
    }

    return { trangThai: 'success', duLieu: thoDuLieu };
  } catch {
    return { trangThai: 'error', loi: 'Loi mang' };
  }
}

async function main(): Promise<void> {
  console.log('--- 14. Ghep tat ca ---');
  console.log(hienThi(await taiSanPham(7)));
}

main();

export { layField, laSanPham, khangDinhLaSanPham, hienThi, taiSanPham };
export type { SanPham, TrangThaiTai, Getters, PhanTuCua, BoField };
