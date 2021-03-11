// macro LOG
// ==========================================
function LOG(x) { console.log(x) };
// ==========================================


// Template string
// ==========================================
//  vd 1 :
function greeting(name) {
    return 'hi ,' + name + ' !';
}
let result = greeting("vcc");
LOG(result);

// vd 2 : có thể thêm nhiều biến hay gọi cả hàm trong Template string
function str2 (name) {
    return `hi , ${name}`;
}
LOG(str2("ok"));
