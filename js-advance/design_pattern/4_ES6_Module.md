
# ES6 Module

_giải thích :_

- Trước sự xuất hiện của ES6, JavaScript không hề có feature tạo module,
các lập trình viên phải dựa vào các thư viện thứ ba hoặc Module Pattern để implement module.

- ES6 Module được lưu các file riêng biệt. Chỉ duy nhất một module trong một file. Mọi thứ trong một module mặc định là private. 
Function, variable, và class được expose ra ngoài bằng cách sử dụng export keyword. Code trong một module luôn ở strict mode.


## Export module :

> cách 1 : Sử dụng keyword export trước khai báo function và variable. 
```js
// 📁 utils.js
export const greeting = 'Hello World';
export function sum(num1, num2) {
    console.log('Sum:', num1, num2);
    return num1 + num2;
}

export function subtract(num1, num2) {
    console.log('Subtract:', num1, num2);
    return num1 - num2;
}
// đây là func private
function privateLog() {
    console.log('Private Function');
}
```

> cách 2 : Sử dụng export keyword ở cuối file kết hợp với tên function và variable muốn
```js
// 📁 utils.js
function multiply(num1, num2) {
    console.log('Multiply:', num1, num2);
    return num1 * num2;
}
function divide(num1, num2) {
    console.log('Divide:', num1, num2);
    return num1 / num2;
}
// This is a private function
function privateLog() {
    console.log('Private Function');
}
export { multiply, divide };
```

## Import Module 

> cách 1 : Import nhiều item một lần
```js
// 📁 main.js
// import nhiều item
import { sum, multiply } from './utils.js';
console.log(sum(3, 7));
console.log(multiply(3, 7));
```

> cách 2 : Import cả một module
```js
// 📁 main.js
// import cả module
import * as utils from './utils.js';
console.log(utils.sum(3, 7));
console.log(utils.multiply(3, 7));
```

## Import và Export có thể đặt biệt danh (alias) 
note : tránh các conflict trong naming.

> Alias export
```js
// 📁 utils.js
function sum(num1, num2) {
    console.log('Sum:', num1, num2);
    return num1 + num2;
}
function multiply(num1, num2) {
    console.log('Multiply:', num1, num2);
    return num1 * num2;
}
// sum -> add 
export { sum as add, multiply };
```

> Alias import
```js
// 📁 main.js
// multiply -> mult
import { add, multiply as mult } from './utils.js';
console.log(add(3, 7));
console.log(mult(3, 7));
```
