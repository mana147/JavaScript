// các tạo obj 

// vd :
// define Constructor function for Person objects
function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}

Person.prototype.run = function () {
    let str = ` ${this.firstName + this.lastName } đang chạy bộ  ..`;
    console.log(str);
}

// Create a Person object
let hieu = new Person("Phạm", "Hiếu", 30, "đen");
hieu.run(); //  PhạmHiếu đang chạy bộ  ..

// vd : object literals

const name_car = 'car honda';
const car = {
    name_car : name_car,
    running: function () {
        console.log(`${this.name_car} is running ...`);
    }
};

car.running();


// Enhanced object literals , tính năng mới của ES6
// khai báo ngắn gọn hơn các thuộc tính và các method

const nameT = 'Tom';
const cat = {
    nameT,
    run() {
        console.log(`${this.nameT} do something  ... `);
    }
};

cat.run();