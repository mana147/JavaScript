// Biểu thức hàm : khái niệm quan trọng
// vd :
var a = b;
// số hạng b có thể là một biến, một giá trị ... 
// Giờ nếu thay số hạng b bằng một khai báo hàm đã biết ở trên, 
// thì lúc này ta gọi nó là một biểu thức hàm.

var a = function xinchao(guestname) {
    console.log('Xin chào ' + guestname);
}

// giá trị của biểu thức này đã gán vào biến a
// nếu muốn gọi biểu thức ta dùng biến a tương tự như tên hàm để thực hiện biểu thức.
a("Expression");


// Hàm ẩn danh anonymous 
// trong phần khai báo bỏ tên đi (không tên)
var b = function (guestname) {
    console.log('Xin chào ' + guestname);
}
b ("Expression");


// Biểu thức hàm chạy ngay lập tức
// Trong nhiều trường hợp, chúng ta khai báo biểu thức hàm rồi dùng chỉ một lần.
// IIFE (biểu thức hàm chạy luôn - Immediately Invokable Function Expression)

(function (a, b, c) {
    var tong = a + b + c;
    console.log(`tong = ${tong}`);
}(5, 6, 7));


// Arrow function 
// vd 1 : khai báo hàm bình thường
function sum0(a, b) {
    return a + b;
};

console.log(sum0(1, 2));

// vd 2 : khai báo biến = hàm gán giá trị
let sum1 = function (a, b) {
    return a + b;
};
console.log(sum1(33, 2));

// vd 3 : 
let sum3 = (a, b) => {
    return a + b;
};
console.log(sum3(3113, 2));

// vd 4 : 
let sum4 = (a, b) => a + b;
console.log(sum4(3113, 2));

// vd 5 : 
var square = (x) => x * x;
console.log(square(5))

// vd 6 :  
let doSomething = () => Date.now();
console.log(doSomething());
