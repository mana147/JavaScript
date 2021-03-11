//  ghi đè trong js
// vd : 

// tạo máy pha cà phê 
class CoffeeMachine {
    makeCoffee() {
        console.log(' máy đang pha cà phê ...');
    }
}

// ghi đè chức năng pha cà phê 
class SpecialCoffeeMachine extends CoffeeMachine {
    // viết lại đúng tên hàm cần ghi đè
    // thêm hàm callback
    makeCoffee(callback) {
        console.log(' máy đang pha cà phê và ép táo');
        callback();
    }
};

let coffeeMachine = new SpecialCoffeeMachine();
coffeeMachine.makeCoffee(
    // truyền thêm hàm callback vào
    function () {
        console.log(' pha đồ xong nhớ gọi khách ... ');
    } 
);