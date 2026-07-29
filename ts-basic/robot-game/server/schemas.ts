/**
 * ZOD SCHEMA — VALIDATE Ở CẢ HAI ĐẦU
 * ----------------------------------
 * Đúng nguyên tắc "validate tại ranh giới hệ thống" trong zod.md:
 *
 *   1. Input từ CLIENT  -> người dùng gửi gì cũng được, phải kiểm
 *   2. Row từ DATABASE  -> node:sqlite trả về `unknown`, không có gì
 *                          đảm bảo cột đúng kiểu (file .db có thể bị
 *                          sửa tay, schema có thể đổi qua thời gian)
 *
 * Nhiều người chỉ validate đầu 1 rồi tin tuyệt đối đầu 2 — đó là chỗ
 * hay sinh bug khó tìm.
 */

import { z } from 'zod';

// =====================================================================
// CỘT PHÂN LOẠI — trái tim của thiết kế
// =====================================================================

// Đây chính là discriminated union (advanced.md mục 12) nhưng nằm ở DB.
// Factory sẽ switch trên giá trị này để biết `new` ra class nào.
export const LoaiRobotSchema = z.enum(['chien-dau', 'y-te', 've-sinh']);
export type LoaiRobot = z.infer<typeof LoaiRobotSchema>;

export const TrangThaiSchema = z.enum(['san-sang', 'dang-lam', 'het-pin']);

// =====================================================================
// 1. VALIDATE INPUT TỪ CLIENT
// =====================================================================

// Dùng discriminated union của Zod: dựa vào field `loai` để biết
// những field nào khác là bắt buộc.
export const TaoRobotSchema = z.discriminatedUnion('loai', [
  z.object({
    loai: z.literal('chien-dau'),
    ten: z.string().min(2, 'Ten robot phai tu 2 ky tu').max(30),
    sucTanCong: z.number().int().min(1).max(100),
    doCaoToiDa: z.number().int().min(0).max(10000).default(500),
  }),
  z.object({
    loai: z.literal('y-te'),
    ten: z.string().min(2, 'Ten robot phai tu 2 ky tu').max(30),
    chuyenKhoa: z.string().min(2, 'Chuyen khoa phai tu 2 ky tu').max(50),
  }),
  z.object({
    loai: z.literal('ve-sinh'),
    ten: z.string().min(2, 'Ten robot phai tu 2 ky tu').max(30),
    khuVuc: z.string().min(2).max(50).default('toan nha'),
  }),
]);

export type TaoRobotInput = z.infer<typeof TaoRobotSchema>;

export const DauTruongSchema = z.object({
  serialA: z.string().min(1),
  serialB: z.string().min(1),
});

export const ChargeSchema = z.object({
  luong: z.number().int().min(1).max(100).default(20),
});

// =====================================================================
// 2. VALIDATE ROW ĐỌC TỪ DATABASE
// =====================================================================

// SQLite chỉ có 5 kiểu (NULL, INTEGER, REAL, TEXT, BLOB) — không có boolean,
// không có date, không có enum. Nên mọi ràng buộc chặt hơn phải kiểm ở đây.
export const RobotRowSchema = z.object({
  serial: z.string(),
  ten: z.string(),
  loai: LoaiRobotSchema, // ⭐ ép về đúng union, sai là biết ngay
  pin: z.number().int().min(0).max(100),
  vi_tri: z.string(),
  trang_thai: TrangThaiSchema,

  // nullable() vì cột này NULL với loại robot khác
  suc_tan_cong: z.number().int().nullable(),
  do_cao_toi_da: z.number().int().nullable(),
  chuyen_khoa: z.string().nullable(),
  khu_vuc: z.string().nullable(),

  tao_luc: z.string(),
});

export type RobotRow = z.infer<typeof RobotRowSchema>;

export const ThongKeRowSchema = z.object({
  serial: z.string(),
  so_viec_lam: z.number().int(),
  so_tran_thang: z.number().int(),
  so_tran_thua: z.number().int(),
});

export type ThongKeRow = z.infer<typeof ThongKeRowSchema>;
