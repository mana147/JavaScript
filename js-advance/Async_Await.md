# Async / Await

    Giải thích : Async / Await là một tính năng của JavaScript, 
    Nó được xây dựng trên Promises và tương thích với tất cả các Promise dựa trên API. 
    Nó làm cho Promises trở lên dễ code dễ hiểu hơn.

## Async : làm một hàm trả về một Promise.

có nghĩa là : cứ khai báo async trước 1 hàm nào , thì nó tự động 
- đẩy [ return value ] của hàm đó vào Promise.resolve( value ) 
- đẩy [ throw error ] của hàm đó vào Promise.reject( error )
- đưa thêm context để xử dụng [ await ] 

ví dụ : sử dụng promise 
```js
//  hàm này trả về một Promise 
//  giả lập việc get data đc  
function getData(key) {
    return new Promise(function (resolve, reject) {
        // cho data = 'data 123 !@#';
        let data = 'data 123 !@#';
        let err = 'erro';

        if (key == 'ok') {
            //  truyền data vào resolve
            resolve(data);
        } else if (key == 'null') {
            // 
            reject(err);
        }

    });
}

getData("ok")
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.log(err) });

getData("null")
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.log(err) });

```
Sử dụng Async viết lại hàm trên :

hàm async sẽ throw một exception giống như reject của promise.

```js
async function asyn_promise(key) {
    let data = 'data 123 !@#';
    let err = 'erro';

    if (key == 'ok') {
        return data;
    } else if (key == 'null') {
        throw err;
    }
}

console.log(asyn_promise);

asyn_promise("ok")
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.log(err) });

asyn_promise("null")
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.log(err) });

```

## Await : đợi cho đến khi Promise đó pending xong và trả về resolve hoặc reject .

giải thích : hiểu đơn giản là dừng việc thực thi hàm cho đến khi thằng Promise được giải quyết xong .

ví dụ :
```js
// viết 1 hàm promise đợi trong một khoảng thơi gian 

// khai báo biến promise = hàm vô danh có 2 tham số (numb,str) và hàm này trả về một Promise  
let promise = (numb, str) => new Promise(function (res, rej) {
    setTimeout(function () {
        res(str);
    }, numb);
});

// viết hàm Async có sử dụng Await
async function main() {
    console.time('Execution Time');  // check time

    console.log('1');
    await promise(1000, "1/2").then(val => console.log(val));
    console.log('2');
    await promise(2000, "2/3").then(val => console.log(val));
    console.log('3');
    await promise(3000, "3/4").then(val => console.log(val));
    console.log('4');

    console.timeEnd('Execution Time'); // end
    return "end";
}

main();
```
> Qua ví dụ trên chúng ta có thế thấy là, bản chất của hàm Async chính là Promise.

## Xử lý ngoại lệ với Async/Await :
xét ví dụ trên và sử dụng try / catch :
```js
const { PerformanceObserver, performance } = require('perf_hooks');

let promise = (numb, str) => new Promise(function (res, rej) {
    
    setTimeout(function () {
        res(str);
    }, numb);
});

async function main() {
    let t0 = performance.now();

    console.log('1');
    await promise(1000, "1/2").then(val => console.log(val));
    console.log('2');
    await promise(2000, "2/3").then(val => console.log(val));
    console.log('3');
    await promise(3000, "3/4").then(val => console.log(val));
    console.log('4');


    let t1 = performance.now();

    let timeExecute = t1 - t0;
    
    if (timeExecute < 6100 ) {
        return `Time Execute = ${timeExecute}`;
    } else {
        throw `Time Execute = ${timeExecute}`;
    }

}

async function tryCath() {
    try {
        await main().then(function (val) { console.log(val) });
        console.log('chạy không lỗi')
    } catch (e) {
        console.log(` error ${e} `)
    }
}

tryCath();
```

## Vấn đề gặp phải : mất tính chất song song.
giải thích : nếu cứ khai báo await thì phải trờ cho await xử lý xong mới được thực hiện tiếp

giải pháp : cho xử lý bất đồng bộ chạy trước đi rồi lấy kết quả sau, vì Promise có thể cho phép ta lấy kết quả bất cứ khi nào mà nó ở trạng thái cuối cùng, nên ta có thể chạy nó trước rồi lấy sau.

viết lại ví dụ trên :
```js
const { PerformanceObserver, performance } = require('perf_hooks');

let promise = (numb, str) => new Promise(function (res, rej) {
    
    setTimeout(function () {
        res(str);
    }, numb);
});

async function main() {
    let t0 = performance.now();

    // chạy bất tuần tự 2 promise này
    let p1 = promise(1000, "1/2").then(val => console.log(val));
    let p2 = promise(2000, "2/3").then(val => console.log(val));


    // đợi khi cả 2 promise trên chạy xong và được resolve
    console.log('1');
    await p1;
    console.log('2');
    await p2;

    let t1 = performance.now();
    let timeExecute = t1 - t0;
    if (timeExecute < 6100 ) {
        return `Time Execute = ${timeExecute}`;
    } else {
        throw `Time Execute = ${timeExecute}`;
    }

}

async function tryCath() {
    try {
        await main().then(function (val) { console.log(val) });
        console.log('chạy không lỗi')
    } catch (e) {
        console.log(` error ${e} `)
    }
}

tryCath();
```
> ta chỉ mất 2s để thực hiện vì đoạn wait của ta được thực thi song song. 

Ngoài ra có thể sử dụng Promise.all để song song hóa các Promise.

xét ví dụ sau :
```js
//  khai báo hàm wait truyền tham số ms 
// trả về một promise chạy api setTimeout
function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}

async function main() {
    // cách 1 chạy tuần tự
    console.time('time0')
    await wait(1000)
    await wait(2000)
    console.timeEnd('time0')

    //  cách 2 khai báo chạy trước lấy kết quả sau 
    console.time('time1')
    let w1 = wait(1000)
    let w2 = wait(2000)
    await w1
    await w2
    console.timeEnd('time1')

    // sử dụng promise all
    console.time('time2')
    await Promise.all([wait(1000), wait(2000)])
    console.timeEnd('time2')
}
```
giải thích : Promise.all chỉ ở trạng thái thành công khi mà tất cả các Promise được truyền vào xử lý thành công,
còn nó sẽ ở trạng thái lỗi khi một trong các Promise truyền vào bị lỗi.
Như vậy, nếu muốn bỏ qua các Promise lỗi thì không thể sử dụng Promise.all được. 
Lúc đó bắt buộc phải sử dụng await kèm với try catch cho từng Promise .


# Vấn đề của async/await:

async/await cũng có một số bất cập mà các bạn cần phải lưu ý khi sử dụng:

- Không chạy được trên các trình duyệt cũ. Nếu dự án yêu cầu phải chạy trên các trình duyệt cũ, bạn sẽ phải dùng Babel để transpiler code ra ES5 để chạy.
- Khi ta await một promise bị reject, JavaScript sẽ throw một Exception. Do đó, nếu dùng async await mà quên try catch thì lâu lâu chúng ta sẽ bị… nuốt lỗi hoặc code ngừng chạy.
- async và await bắt buộc phải đi kèm với nhau! await chỉ dùng được trong hàm async, nếu không sẽ bị syntax error. Do đó, async/await sẽ lan dần ra toàn bộ các hàm trong code của bạn.