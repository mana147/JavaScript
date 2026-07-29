/**
 * DEMO ZOD — VALIDATE RUNTIME + TỰ SINH TYPE
 * ------------------------------------------
 * Học sau khi nắm demo.ts và advanced.ts (đặc biệt là mục 10: Type Guard).
 *
 * Cài:   npm install zod
 * Chạy:  npx tsx zod-demo.ts
 *
 * Bản Zod dùng ở đây: v4. Xem giải thích trong file zod.md
 */

import { z } from 'zod';

// =====================================================================
// 1. VẤN ĐỀ ZOD GIẢI QUYẾT
// =====================================================================

// TypeScript chỉ tồn tại lúc COMPILE. Khi code chạy, type biến mất sạch.
// => Dữ liệu từ bên ngoài (API, form, file JSON, localStorage) KHÔNG được
//    TS kiểm tra. Ép kiểu chỉ là lời hứa suông:

interface SanPhamTS {
  id: number;
  ten: string;
}

const duLieuTho = JSON.parse('{"id": "sai kieu", "ten": 123}');
const sp = duLieuTho as SanPhamTS; // TS im lặng, nhưng dữ liệu SAI hoàn toàn
console.log('--- 1. Van de ---');
console.log('TS tin sp.id la number, nhung thuc te:', typeof sp.id, '=', sp.id);

// Zod kiểm tra ở RUNTIME (lúc chạy thật) — thứ mà `as` không làm được.

// =====================================================================
// 2. SCHEMA CƠ BẢN & PARSE
// =====================================================================

// Khai báo "hình dạng" dữ liệu mong muốn
const SanPhamSchema = z.object({
  id: z.number(),
  ten: z.string(),
  gia: z.number(),
  tonKho: z.boolean(),
});

// .parse() -> trả về dữ liệu nếu hợp lệ, THROW nếu sai
const spHopLe = SanPhamSchema.parse({
  id: 1,
  ten: 'Dell Vostro',
  gia: 12000000,
  tonKho: true,
});

console.log('--- 2. Parse ---');
console.log('Hop le:', spHopLe.ten);

// =====================================================================
// 3. z.infer — TỰ SINH TYPE TỪ SCHEMA (điểm ăn tiền nhất)
// =====================================================================

// KHÔNG cần viết interface riêng nữa. Type suy ra thẳng từ schema.
// Sửa schema -> type tự đổi theo. Một nguồn sự thật duy nhất.
type SanPham = z.infer<typeof SanPhamSchema>;
// => { id: number; ten: string; gia: number; tonKho: boolean }

const spCoType: SanPham = spHopLe; // TS gợi ý đầy đủ .ten, .gia...

console.log('--- 3. z.infer ---');
console.log('Type suy ra tu schema, gia:', spCoType.gia);

// =====================================================================
// 4. safeParse — KHÔNG throw, trả về kết quả để tự xử lý
// =====================================================================

// .parse() throw khi sai -> phải bọc try/catch.
// .safeParse() trả về { success, data } | { success, error } -> gọn hơn.
// Chú ý: đây CHÍNH LÀ discriminated union ở advanced.ts mục 12!

const ketQua = SanPhamSchema.safeParse({ id: 'sai', ten: 123 });

console.log('--- 4. safeParse ---');
if (ketQua.success) {
  console.log('OK:', ketQua.data.ten);
} else {
  // ketQua.error.issues: mảng lỗi chi tiết, chỉ rõ field nào sai
  console.log('That bai, so loi:', ketQua.error.issues.length);
  ketQua.error.issues.forEach((issue) => {
    console.log(`  - Field [${issue.path.join('.')}]: ${issue.message}`);
  });
}

// =====================================================================
// 5. VALIDATION CHI TIẾT — không chỉ đúng kiểu mà đúng RÀNG BUỘC
// =====================================================================

// Đây là thứ TypeScript KHÔNG BAO GIỜ làm được: kiểm tra giá trị.
const NguoiDungSchema = z.object({
  email: z.email('Email khong hop le'), // Zod v4: z.email() thay cho .string().email()
  tuoi: z.number().int().min(18, 'Phai tu 18 tuoi').max(120),
  ten: z.string().min(2, 'Ten qua ngan').max(50),
  website: z.url().optional(), // optional: có cũng được, không có cũng được
  vaiTro: z.enum(['user', 'admin', 'guest']), // chỉ nhận 3 giá trị này
  diem: z.number().default(0), // có default nếu thiếu
});

type NguoiDung = z.infer<typeof NguoiDungSchema>;

const nguoiDungTest = NguoiDungSchema.safeParse({
  email: 'khong-phai-email',
  tuoi: 15,
  ten: 'A',
  vaiTro: 'boss',
});

console.log('--- 5. Validation chi tiet ---');
if (!nguoiDungTest.success) {
  nguoiDungTest.error.issues.forEach((issue) => {
    console.log(`  - [${issue.path.join('.')}]: ${issue.message}`);
  });
}

// Dữ liệu hợp lệ: Zod tự điền `diem: 0` vì có .default()
const nguoiDungOk = NguoiDungSchema.parse({
  email: 'hieu@example.com',
  tuoi: 28,
  ten: 'Hieu Pham',
  vaiTro: 'admin',
});
console.log('Hop le, diem mac dinh duoc dien:', nguoiDungOk.diem);

// =====================================================================
// 6. SCHEMA LỒNG NHAU & MẢNG
// =====================================================================

const DiaChiSchema = z.object({
  duong: z.string(),
  thanhPho: z.string(),
});

const DonHangSchema = z.object({
  maDon: z.string(),
  khachHang: NguoiDungSchema, // lồng schema vào schema
  diaChi: DiaChiSchema,
  sanPham: z.array(SanPhamSchema), // mảng các SanPham
  tongTien: z.number().positive(),
});

type DonHang = z.infer<typeof DonHangSchema>; // type lồng nhau tự suy ra hết

console.log('--- 6. Long nhau & Mang ---');
const donTest = DonHangSchema.safeParse({ maDon: 'DH001', sanPham: 'khong phai mang' });
console.log('Don hang thieu field, hop le?', donTest.success);

// =====================================================================
// 7. BIẾN ĐỔI DỮ LIỆU — transform & coerce
// =====================================================================

// .transform(): đổi dữ liệu sau khi validate
const ChuoiThanhSo = z.string().transform((s) => s.length);
console.log('--- 7. Transform & Coerce ---');
console.log('Do dai chuoi qua transform:', ChuoiThanhSo.parse('hello')); // 5

// z.coerce: tự ép kiểu trước khi validate — cực hữu ích cho query param,
// form (luôn là string) hay biến môi trường
const CauHinhSchema = z.object({
  port: z.coerce.number(), // "3000" (string) -> 3000 (number)
  debug: z.coerce.boolean(), // "true" -> true
});

const cauHinh = CauHinhSchema.parse({ port: '3000', debug: 'yes' });
console.log('Coerce tu string:', cauHinh.port, typeof cauHinh.port);

// =====================================================================
// 8. RÀNG BUỘC TÙY Ý — .refine()
// =====================================================================

// Khi cần luật riêng mà Zod không có sẵn (vd: so khớp 2 field)
const DangKySchema = z
  .object({
    matKhau: z.string().min(6),
    xacNhanMatKhau: z.string(),
  })
  .refine((data) => data.matKhau === data.xacNhanMatKhau, {
    message: 'Mat khau xac nhan khong khop',
    path: ['xacNhanMatKhau'], // gắn lỗi vào field này
  });

console.log('--- 8. Refine ---');
const dangKyTest = DangKySchema.safeParse({ matKhau: '123456', xacNhanMatKhau: 'khac' });
if (!dangKyTest.success) {
  console.log('Loi:', dangKyTest.error.issues[0].message);
}

// =====================================================================
// 9. MẪU THỰC TẾ — VALIDATE RESPONSE API
// =====================================================================

// Đây là luồng chính đáng nhớ nhất: fetch -> parse -> dữ liệu đã an toàn & có type

// Bọc kết quả trong discriminated union (giống advanced.ts mục 12)
type KetQuaTai<T> =
  | { trangThai: 'success'; duLieu: T }
  | { trangThai: 'error'; loi: string };

async function taiSanPham(): Promise<KetQuaTai<SanPham>> {
  // giả lập fetch trả về JSON thô, kiểu unknown như đời thật
  const responseTho: unknown = {
    id: 99,
    ten: 'San pham API',
    gia: 500000,
    tonKho: true,
  };

  // validate ngay tại ranh giới hệ thống — chỉ tin sau khi parse
  const kq = SanPhamSchema.safeParse(responseTho);
  if (!kq.success) {
    return { trangThai: 'error', loi: kq.error.issues[0].message };
  }

  // từ đây kq.data đã có type SanPham đầy đủ, đảm bảo đúng cả kiểu lẫn giá trị
  return { trangThai: 'success', duLieu: kq.data };
}

async function main(): Promise<void> {
  console.log('--- 9. Validate API response ---');
  const kq = await taiSanPham();
  if (kq.trangThai === 'success') {
    console.log('Tai xong, da validate:', kq.duLieu.ten, '-', kq.duLieu.gia);
  } else {
    console.log('Loi:', kq.loi);
  }
}

main();

// =====================================================================
// 10. ĐỐI CHIẾU: TYPE GUARD TAY (advanced.ts m10) vs ZOD
// =====================================================================

// advanced.ts mục 10: phải tự viết ~10 dòng check, TS KHÔNG kiểm tra logic
// -> viết sai là type-safety thành ảo giác.
//
// Zod: khai báo schema 1 lần, được CẢ validator lẫn type. An toàn thật sự.

// Type guard "miễn phí" từ schema — thay cho hàm laSanPham() viết tay
function laSanPham(x: unknown): x is SanPham {
  return SanPhamSchema.safeParse(x).success;
}

console.log('--- 10. Zod thay type guard tay ---');
console.log('laSanPham(hop le)?', laSanPham(spHopLe));
console.log('laSanPham(rac)?', laSanPham({ linh: 'tinh' }));

export { SanPhamSchema, NguoiDungSchema, DonHangSchema, taiSanPham, laSanPham };
export type { SanPham, NguoiDung, DonHang };
