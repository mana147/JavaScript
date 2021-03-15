/* 
Method Chaining trong JavaScript
****
- Đơn giản thì Method Chainning là một kỹ thuật được sử dụng để viết code một cách ngắn gọn 
và đơn giản hơn trong việc gọi các hàm liên tiếp trên cùng một đối tượng .

- mấu chốt của vấn đề là mỗi phương thức đều trả lại tham chiếu đến chính nó qua cú pháp return this;
như vậy ta có thể gọi một chuỗi các hàm của đối tượng đó.

*/

// // Không sử dung METHOD CHAINING
// var $div = $('#my-div');

// $div.css('background', 'blue');
// $div.height(100);
// $div.fadeIn(200);

// // Sử dụng METHOD CHAINING

// $('#my-div').css('background', 'blue').height(100).fadeIn(200);
// // hoặc đẹp hơn sẽ là:
// $('#my-div')
//     .css('background', 'blue')
//     .height(100)
//     .fadeIn(200);


// vd : Không sử dung METHOD CHAINING
// define the class

// let Kitten = function () {
//     this.name = 'Garfield';
//     this.color = 'brown';
//     this.gender = 'male';
// };

// Kitten.prototype.setName = function (name) {
//     this.name = name;
// };

// Kitten.prototype.setColor = function (color) {
//     this.color = color;
// };

// Kitten.prototype.setGender = function (gender) {
//     this.gender = gender;
// };

// Kitten.prototype.save = function () {
//     console.log(
//         `saving ${this.name} , the ${this.color} ${this.gender} ... `
//     );
//     console.log(this);
// };


// let bob = new Kitten();
// bob.setName('Bob');
// bob.setColor('black');
// bob.setGender('male')
// bob.save();


// > saving Bob , the black male ..

// =============================================

// vd : Implementing Method Chaining
// define the class
var Animal = function () {
    this.name = 'Cat';
    this.color = 'black';
    this.gender = 'male';
};

Animal.prototype.setName = function (name) {
    this.name = name;
    console.log(this);
    return this;
};

Animal.prototype.setColor = function (color) {
    this.color = color;
    console.log(this);
    return this;
};

Animal.prototype.setGender = function (gender) {
    this.gender = gender;
    console.log(this);
    return this;
};

Animal.prototype.save = function () {
    console.log(` Animal : ${this.name} ${this.color} ${this.gender} `);
    console.log(this);
    return this;
};

let cat = new Animal();
cat.setName('cat').setColor('black').setGender('male').save();

// >  Animal : Bob black male 


// // câu hỏi đặt ra hàm nào viết vào cũng phải return this;

// // define the class
// var Cars = function () {
//     this.name = 'Honda';
//     this.color = 'red';
//     this.power = 'oil';
// };

// Cars.prototype.setName = function (name) {
//     this.name = name;
// };

// Cars.prototype.setColor = function (color) {
//     this.color = color;
// };

// Cars.prototype.setPower = function (power) {
//     this.power = power;
// };

// Cars.prototype.get = function () {
//     return 'string';
// };

// Cars.prototype.save = function () {
//     console.log(` the ${this.name} : ${this.color} : ${this.power} ! `);
// };

// Cars.prototype.sayHi = function (name) {
//     return "Hi " + name + "! My name is " + this.name + ".";
// };

// function chainify(obj) {
//     Object.keys(obj).forEach(function (key) {
//         // console.log(key);
//         var member = obj[key];
//         if (typeof member === "function" && !/\breturn\b/.test(member)) {
//             obj[key] = function () {
//                 // console.log(this);
//                 member.apply(this, arguments);
//                 // console.log(member);
//                 return this;
//             }
//         }
//     });
// }

// // gọi hàm chainifi
// chainify(Cars.prototype);

// var dream = new Cars();
// // console.log('>>>>'+dream.setName);
// dream.setName('dream').setColor('black').setPower('gas').save();

// console.log(dream.sayHi("vision"));


