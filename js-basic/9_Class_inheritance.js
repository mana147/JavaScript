// Prototypal inheritance
// tạo ra một object trong Javascript kế thừa từ một object khác

// tạo class animal
class Animal {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(` ${this.name} đăng ăn ... `);
        // console.log(this);
        // return this;
    }
}

// tạo class bird kế thừa lớp animal
class Bird extends Animal {
    fly() {
        console.log(` ${this.name} đang bay ... `);
        // console.log(this);
        // return this;
    }
}

let qua = new Bird('quạ');
qua.eat();
qua.fly();

// qua.eat().fly();


// tạo class vẹt kế thưa lớp bird 
class Parrot extends Bird {
    speak() {
        console.log (` ${this.name} đang chém gió .... `)
    }
}

let vet = new Parrot('vẹt');
vet.eat();
vet.fly();
vet.speak();

