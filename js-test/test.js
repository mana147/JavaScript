// function delay(time) {
//     let promise;

//     promise = new Promise(function (resolve, err) {
//         setTimeout(function () {
//             resolve(time);
//         }, time)
//     });

//     return promise;
// }

// async function main() {

// };

// main();



// (function main(arg) {
//     delay(1000)
//         .then(function (data) {
//             console.log(`delay = ${data}`);
//             return delay(500);
//         })
//         .then(function (data) {
//             console.log(`delay = ${data}`);
//             return delay(100);
//         })
//         .then(function (data) {
//             console.log(`delay = ${data}`);
//             return delay(100);
//         })
// }());

// async function something() {
//     console.log("this might take some time....");
//     await delay(1000);
//     console.log("done!")
// }

// something();


// function wait(ms, cb) {
//    setTimeout(cb, ms)
// }

// function main() {
//    console.log('sắp rồi...')
//    wait(2007, () => {
//      console.log('chờ tí...')
//      wait(2012, () => {
//        console.log('thêm chút nữa thôi...')
//        wait(2016, () => {
//          console.log('xong rồi đấy!')
//        })
//      })
//    })
// }

// // main();
// const fetch = require('node-fetch');

// function getJson() {
//     let dataJson;

//     dataJson = new Promise(function (data, err) {
//         const response = fetch('https://api.github.com/users/octoscat');
//         data(response);
//     });

//     return dataJson;
// }

// function main() {
//     getJson()
//         .then(function (value) {
//             console.log(value);
//         })
// }


//  sử dụng promise

// //  hàm này trả về một Promise 
// //  giả lập việc get data đc  
// function getData(key) {
//     return new Promise(function (resolve, reject) {
//         // cho data = 'data 123 !@#';
//         let data = 'data 123 !@#';
//         let err = 'erro';

//         if (key == 'ok') {
//             //  truyền data vào resolve
//             resolve(data);
//         } else if (key == 'null') {
//             // 
//             reject(err);
//         }

//     });
// }


// getData("ok")
//     .then(function (value) { console.log(value) })
//     .catch(function (err) { console.log(err) });


// getData("null")
//     .then(function (value) { console.log(value) })
//     .catch(function (err) { console.log(err) });



// // sử dụng Async / Await viết lại hàm trên

// async function asyn_promise(key) {
//     let data = 'data 123 !@#';
//     let err = 'erro';

//     if (key == 'ok') {
//         return data;
//     } else if (key == 'null') {
//         throw err;
//     }
// }

// console.log(asyn_promise);

// asyn_promise("ok")
//     .then(function (value) { console.log(value) })
//     .catch(function (err) { console.log(err) });

// asyn_promise("null")
//     .then(function (value) { console.log(value) })
//     .catch(function (err) { console.log(err) });

// function delay(time) {
//     let promise;

//     promise = new Promise(function (resolve, err) {
//         setTimeout(function () {
//             resolve(time);
//         }, time)
//     });

//     return promise;
// }


// // //  giải lập get data từ server , sau 2s 
// // sủ dung promise
// function getData () {
//     let promise;
//     let data = "123 !@# vcc"

//     promise = new Promise(function (res, rej) {
//         setTimeout(function () {
//             res(data);
//         }, 2000)
//     });

//     return promise;
// }

// getData()
//     .then(function (data) { console.log(data) })
//     .catch(function (err) { console.log(err) });


// async function Asyn(str) {
//     return str; 
// }

// Asyn("hello").then(data => console.log(data));

// async function main() {
//     let A = await Asyn("A");
//     let B = await Asyn("B");
//     let C = await Asyn("C");
//     console.log(A, B, C);
//     return [A, B, C];
// }

// console.log(main())


// function wait(numb , str) {
//     let prmise 

//     return delay
// }

// async function main() {
//     console.log("1");
//     // viết hàm đợi 1 s mới đc in ra số 2
//     console.log("3");
// };
// main();

// const { PerformanceObserver, performance } = require('perf_hooks');

// let promise = (numb, str) => new Promise(function (res, rej) {

//     setTimeout(function () {
//         res(str);
//     }, numb);
// });

// async function main() {
//     let t0 = performance.now();

//     let p1 = promise(1000, "1/2").then(val => console.log(val));
//     let p2 = promise(1000, "2/3").then(val => console.log(val));

//     console.log('1');
//     await p1;
//     console.log('2');
//     await p2;

//     let t1 = performance.now();
//     let timeExecute = t1 - t0;
//     if (timeExecute < 6100 ) {
//         return `Time Execute = ${timeExecute}`;
//     } else {
//         throw `Time Execute = ${timeExecute}`;
//     }

// }

// // main();

// async function tryCath() {
//     try {
//         await main().then(function (val) { console.log(val) });
//         console.log('chạy không lỗi')
//     } catch (e) {
//         console.log(` error ${e} `)
//     }
// }

// tryCath();

// //  khai báo hàm wait truyền tham số ms 
// // trả về một promise chạy api setTimeout
// function wait(ms) {
//     return new Promise(r => setTimeout(r, ms))
// }

// async function main() {

//     console.time('time0')
//     await wait(1000)
//     await wait(2000)
//     console.timeEnd('time0')

//     console.time('time1')
//     let w1 = wait(1000)
//     let w2 = wait(2000)
//     await w1
//     await w2
//     console.timeEnd('time1')

//     console.time('time2')
//     await Promise.all([wait(1000), wait(2000)])
//     console.timeEnd('time2')
// }

// // viết hàm asyn 
// async function main() {
//     console.time('time')

//     await Promise.all([wait(1000), wait(2000)])

//     console.timeEnd('time')
// }

// // main();

// let fs = require('fs');

// function readFilePromise(path) {
//     return new Promise(function (resovle, reject) {
//         fs.readFile(path, 'utf8', function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resovle(data);
//             }
//         });
//     });
// }

// async function run() {
//     console.log("time Start");
//     let song1 = readFilePromise('./song1.txt');
//     let song2 = readFilePromise('./song2.txt');
//     let song3 = readFilePromise('./song3.txt');
//     await song1.then(data => console.log(data)).catch(err => console.log(err));
//     await song2.then(data => console.log(data)).catch(err => console.log(err));
//     await song3.then(data => console.log(data)).catch(err => console.log(err));
//     console.log("time End");
//     return [song1, song2, song3 ];
// }
// run();

// // Hàm này trả ra lời hứa chứ không phải data

// const hua_lay_du_lieu = new Promise(function (thuc_hien_loi_hua, that_hua) {

//     //  chỉ một trong 2 trường hợp thuc_hien_loi_hua hoặc that_hua đc thực hiện 

//     //  giả sử chương trình lấy data mất 2s

//     //  đây là webAPIs bất đồng bộ

//     setTimeout(function () {

//         // sau khi lấy đc thì trả về kết quả 

//         let data = 'data la 123456 ';

//         // chuyền data vào thưc hien lơi hua

//         thuc_hien_loi_hua(data);

//     }, 1000);

//     // that_hua('err');
// });

// //  Lời hứa bây giờ đang là thực hiện 

// //  .then() sau đó nó giữ lời thì nó sẽ trả ra data

// //  .catch() bắt lỗi nó nếu nó thất hữa , thì trả ra err

// //  .finally() cuối cùng thì dù nó có giữ lời hứa hay thất hứa thì cũng làm gì đó ...

// hua_lay_du_lieu
//     //then(): Dùng để xử lý sau khi "hứa" được thực hiện thành công (khi thuc_hien_loi_hua có data ).
//     .then(function (ket_qua) {
//         console.log("ket qua: ", ket_qua);
//     })
//     // catch(): Dùng để xử lý sau khi "Hứa" có bất kỳ lỗi nào đó (khi that_hua được gọi).
//     .catch(function (err) {
//         console.log("Error: ", err);
//     })
//     // .finally(): Dùng để xử lý cuối cùng dù có data hay lỗi 
//     .finally(function () {
//         console.log(" xử lý cuối cùng dù có ket_qua hay có err ");
//     })\

//  viết lại các task theo Promise

// console.time('Execution Time');  // check time

// let task_1 = new Promise(function (thanh_cong, that_bai) {
//     let data = 'T1 > begin > read cookie';
//     thanh_cong(data);
// });

// let task_2 = new Promise(function (thanh_cong, that_bai) {
//     setTimeout(function () {
//         let data = 'T2 get data from server 1 ';
//         thanh_cong(data);
//     }, 1000);
// });

// let task_3 = new Promise(function (thanh_cong, that_bai) {
//     setTimeout(function () {
//         let data = 'T3 get data from server 2';
//         thanh_cong(data);
//     }, 2000);
// });

// let task_4 = new Promise(function (thanh_cong, that_bai) {
//     setTimeout(function () {
//         let data = 'T4 get data from server 3';
//         thanh_cong(data);
//     }, 500);
// })

// let task_5 = new Promise(function (thanh_cong, that_bai) {
//     let data = 'T5 > render > end';
//     thanh_cong(data);
// })

// Promise.race([task_2, task_3, task_4])
//     .then(function (ket_qua) {
//         console.log(ket_qua);
//         console.timeEnd('Execution Time');
//     })
//     .catch(function (err) {
//         console.log(err);

// viết 1 hàm promise đợi trong một khoảng thơi gian 

// // khai báo biến promise = hàm vô danh có 2 tham số (numb,str) và hàm này trả về một Promise  
// const { PerformanceObserver, performance } = require('perf_hooks');

// let promise = (numb, str) => new Promise(function (res, rej) {

//     setTimeout(function () {
//         res(str);
//     }, numb);
// });

// async function main() {
//     let t0 = performance.now();

//     // chạy bất tuần tự 2 promise này
//     let p1 = promise(1000, "1/2").then(val => console.log(val));
//     let p2 = promise(7000, "2/3").then(val => console.log(val));


//     // đợi khi cả 2 promise trên chạy xong và được resolve
//     console.log('1');
//     await p1;
//     console.log('2');
//     await p2;

//     let t1 = performance.now();
//     let timeExecute = t1 - t0;
//     if (timeExecute < 6100) {
//         return `Time Execute = ${timeExecute}`;
//     } else {
//         throw `Time Execute = ${timeExecute}`;
//     }

// }

// async function tryCath() {
//     try {
//         await main().then(function (val) { console.log(val) });
//         console.log('chạy không lỗi')
//     } catch (e) {
//         console.log(` error ${e} `)
//     }
// }

// tryCath();


const mySingleton = (function () {

    let instance;

    function init() {
        // private Method

        let private_Random_Number = Math.random();
        let private_String_text = 'public method';
        let private_String_name = 'Peter';
        let private_Number_age = 24;

        return {
            public_String_Name: private_String_name,
            public_Number_age: private_Number_age,

            public_String_text: function () {
                return private_String_text;
            },

            public_Random_Number: function () {
                return private_Random_Number;
            }
        }
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            console.log(instance);
            return instance;
        }
    }
})();

console.log(mySingleton.getInstance);

var myInstance_1 = mySingleton.getInstance();
var myInstance_2 = mySingleton.getInstance();

console.log(`myInstance_1 name =  ${myInstance_1.public_String_Name} `);
console.log(`myInstance_1 age = ${myInstance_1.public_Number_age} `);

console.log(`myInstance_2 name =  ${myInstance_1.public_String_Name = 'hieu' } `);
console.log(`myInstance_2 age = ${myInstance_1.public_Number_age = 20 } `);

console.log(`myInstance_1 Random_Number = ${myInstance_1.public_Random_Number()} `);
console.log(`myInstance_2 Random_Number = ${myInstance_2.public_Random_Number()} `);