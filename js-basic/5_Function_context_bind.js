// global context
// function context
// ================================================
// ================================================

let mouse = {
    name: "chuột cống",
    sayHi: function () {
        console.log('hi my name is', this.name);
    }
};

// ================================================
// gọi hàm sayHi()
// biến this.name trong sayHi trỏ đến mouse.
mouse.sayHi();

// gán func mouse.sayHi vào biến say
let say = mouse.sayHi;
// như vậy nó là global context , this không đc gán 
say(); // => undefined


// thay đổi con text của function abc
// sử dụng methods .bind()
// truyền vào object mình muốn làm context

// Các tác dụng của .bind
// Cho phép chúng ta set giá trị của biến "this"

let cat = {
    name: 'Tom',
}

// vd context mới ở đây this.name = Tom
let abc = mouse.sayHi.bind(cat)
abc();


// ================================================
// ================================================

let a = {
    name: 'AAAA',
    old: 112,
    run: function () {
        console.log(`>>> func run : ${this.name} `);
        
        var run2 = function () {
            
            console.log(`>>> func run2 : ${this.name} `);

        }.bind(this);

        run2();
    },
}

a.run();