// Closure là một hàm được viết lồng vào bên trong một hàm khác (hàm cha)
// nó có thể sử dụng biến toàn cục, biến cục bộ của hàm cha và biến cục bộ của chính nó(lexical scoping)

//  vd :
function init() {
    var name = 'Mozilla'; // name là biến cục bộ của hàm init
    function displayName() { // displayName() là hàm closure
        console.log(name); // sử dụng biến của hàm cha
    }
    displayName();
}
init();

// vd :
function sum(a, b) {
    // giải thích : ở đây x sau khi đã tính toán xong sẽ đc giải phóng khỏi bộ nhớ 
    //  nhưng do có hàm tham chiếu đến kết quả x nằm ở bên ngoài hàm 
    //  việc làm như vậy sẽ tạo ra một closure có thể truy cập được biến nằm ngoài scope của nó 

    const x = a + b;
    return function (str) {
        console.log(`${str} = ${x}`);
    };

};

sum(1, 3)("dap so");



//  Javascript Pattern: Factory Pattern