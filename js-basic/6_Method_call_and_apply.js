
// ý nghĩa :
// Với [ call ] và [ apply ] chúng ta sử dụng để thực thi hàm đó luôn khi gọi,
// Với bind ta có thể thực thi hàm đó nhiều lần
//     sau khi đã được buộc [ bind ] với một ngữ cảnh nhất định.

// ==========================================

// tác dụng của .call
// call sẽ truyền lần lượt các tham số.

// // tác dụng của .apply
// // apply sẽ truyền 1 array các tham số


// vd 1 : .call 
let obj_1 = {
    a : 'aaaaaaa',
    b : 'bbbbbbb',
};

let obj_2 = {
    a: 'vcc',
    b: '123'
};

function mMethod(x, y) {
    console.log(this.a + this.b + x + y);
};

mMethod();

mMethod.call(obj_1, ' đây là x ', ' đây là y');

mMethod.apply(obj_2,[' đây là x ', ' đây là y' ] );



// hàm tính tổng : 
// không biết có bao nhiêu đầu vào chúng ta dùng arguments
function sum() {
    // chuyển đổi từ array-like-obj sang array
    const number = Array.from(arguments);
    console.log(number);
    return number.reduce(
        function (x, y) {
            return x + y;
        }, 0
    );
}
console.log(sum(1, 2, 3, 4)); // 10

// hàm tính trung bình cộng : 
function average() {
    // lấy sum() 
    let x = sum.apply(null, arguments);
    //  tính trung bình cộng
    return x / arguments.length;
}

console.log(average(1, 2, 3, 4)); // 2.5 

