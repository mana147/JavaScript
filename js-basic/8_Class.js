// class
// Lớp (class) trong JavaScript được giới thiệu trong ECMAScript 2015
// chủ yếu là cú pháp cải tiến(syntactical sugar) 
// dựa trên nền tảng thừa kế nguyên mẫu(prototypal inheritance) sẵn có trong JS.

// Constructor function
function Mouse(n) {
    this.n = n;
}

Mouse.prototype.run = function () {
    console.log(`${this.n} is running ... `);
}

const mouse = new Mouse('chuột cống');
mouse.run();


//  dùng class : cách viết gọn và tường minh hơn
class MEO {
    constructor(name) {
        this.name = name;
    };
    run() {
        console.log (`${this.name} đang đuổi chuột ! `)
    }
};

let meo = new MEO('mèo nhà');
meo.run();