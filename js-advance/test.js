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



async function main() {
    
    console.log("1");

    new Promise(function (res, rej) {
        let data = "ok";
        setTimeout(function () {
            res(data);
        }, 2000)
    }).then(function (data) { console.log(data); return data });

    console.log("2");

    return "r";
}

console.log(main().then(r=>console.log(r)));
// // 

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