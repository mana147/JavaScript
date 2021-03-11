// macro LOG
// ==========================================
function LOG(x) { console.log(x) };
// ==========================================

// Array-like object & arguments 

// vd 1 : array
const arr = ['Lẩu', 'Đuôi', 'Bò'];
for (let i = 0; i < arr.length; i++) {
    LOG(arr[i]);
};


// vd 2 : Array-like object 
const obj = {
    0: 'Tắc',
    1: 'Cống',
    2: 'Hà',
    3: 'Nội',
    length: 4
};

for (let i = 0; i < obj.length; i++){
    LOG(obj[i]);
};

// vd 3 : 
//  bài toán cho 1 hàm có N đầu vào  
//  tính sum đầu ra
//  sử dụng Arguments

function sum() {
    LOG(arguments);
    LOG(arguments.length);

    let val = 0;

    for (let i = 0; i < arguments.length; i++) {
        val += arguments[i];
    }

    return ` val = ${val} `;
}

LOG (sum (1,2,3,4,5,6,2,4,5,4,5,2,7,7))


// vd 4 :
function a() {
    // chuyển từ array like obj sang array
    const number = Array.from(arguments)
    console.log(number);
};

a(1, 2, 3, 4, 5, 6, 2, 4, 5, 4, 5, 2, 7, 7);
