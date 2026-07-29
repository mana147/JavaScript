/**
 * INTERFACE — "HỢP ĐỒNG NĂNG LỰC"
 * --------------------------------
 * Interface mô tả một class PHẢI CÓ GÌ, không quan tâm nó làm thế nào.
 *
 * Vì sao tách năng lực ra interface riêng thay vì nhét hết vào lớp cha?
 * -> Một class chỉ `extends` được MỘT lớp cha, nhưng `implements` được
 *    NHIỀU interface. Năng lực nào không phải robot nào cũng có
 *    (biết bay, sạc được...) thì để ở interface.
 */

// tính năng cơ bản của robot, tất cả robot đều có
export interface IRobot {
  ten: string;
  serialNumber: string;
  chay(): string;
  dung(): string;
}

// Năng lực: sạc được pin
export interface ICoTheSac {
  dungLuongPin: number;
  sac(luong: number): string;
}

// Năng lực: bay được
export interface ICoTheBay {
  doCaoToiDa: number;
  bay(met: number): string;
}

// Năng lực: tự sửa chữa
export interface ICoTheTuSua {
  tuSua(): string;
}

// Năng lực: nói được 
// trừ năng lương pin ra khỏi interface, vì năng lực này không tốn pin
export interface Ispeak {
  speak(): string;
}

// Năng lực: chiến đấu
// khi triến đấu thì trừ năng lượng pin, nên dungLuongPin được đưa vào interface  
export interface ICoTheChienDau {
  dungLuongPin: number;
  danhSachVuKhi: string[];
  chienDau(vuKhi: string): string;
}
