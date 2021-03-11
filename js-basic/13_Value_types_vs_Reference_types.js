// Value types
let a1 = 1;
let a2 = 1;
console.log(a1 === a2);

// Reference types
let obj1 = { a: 1 };
let obj2 = { a: 1 };
console.log(obj1 === obj2);

// tạo a3 = a2
let a3 = a2;
// thay đổi a3 = 2
a3 = 2;
// log : a2 không thay đổi
console.log(a2);  //  = 1 


// tạo obj3 = obj2 
let obj3 = obj2;
// thay đổi obj3.a = 2
obj3.a = 2;
// log : obj2 bị thay đổi 
// vì obj2 chỉ lưu biến địa chỉ chứ không lưu toàn bộ giá trị 
// do khi tạo obj3 = obj2 => obj3 = địa chỉ vùng nhớ chứa {a : 1 } 
console.log(obj2) // obj2.a = 2 
console.log(obj3 === obj2);