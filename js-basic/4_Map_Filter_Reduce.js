//  .map()
// Phương thức map() giúp tạo ra một mảng mới với các phần tử
// là kết quả từ việc thực thi một hàm lên từng phần tử của mảng được gọi.
//  vd :
//  cho một mảng 
var numbers = [1, 4, 9];
// thực thi hàm *2 kết quả đầu vào
var doubles = numbers.map(
    function (x) {
        return x * 2;
    });
console.log(doubles); // [ 2, 8, 18 


// .filter()
// Phương thức filter() dùng để tạo một mảng mới 
// với tất cả các phần tử thỏa điều kiện của một hàm test.
// vd :
//  cho một mảng  : 
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
// kiểm tra các phần tử trong mảng thỏa mãn yêu cầu .
const result = words.filter(
    function (str) {
        return str.length > 6;
    }
);
console.log(result); // [ 'exuberant', 'destruction', 'present' ]



//  .reduce() 
// Phương thức reduce() dùng để thực thi một hàm lên từng phần tử của mảng
// (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất.
//  cú pháp :
//  arr.reduce( callback 
//  accumulator : Biến tích lũy, truyền giá trị trả về của mỗi lần gọi callback; 
//  currentValue : Phần tử trong mảng hiện tại đang được xử lý.
//  currentIndex : Chỉ mục (index) của phần tử đang được xử lý. Bắt đầu tại 0,
//                          nếu giá trị initialValue được cung cấp, và tại 1 nếu không có initialValue.
// vd : 

//  cho 1 mảng 
const array1 = [1, 2, 3, 4];
//  chỉ mục bắt đầu từ 0 
let currentIndex = 10;

const reducer = array1.reduce(
    function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, currentIndex
);

console.log(reducer); // 10
