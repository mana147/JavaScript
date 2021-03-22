# Async / Await

    Giải thích : Async / Await là một tính năng của JavaScript, 
    Nó được xây dựng trên Promises và tương thích với tất cả các Promise dựa trên API. 
    Nó làm cho Promises trở lên dễ code dễ hiểu hơn.

## Async : làm một hàm trả về một Promise.

> Async function là một cách để chúng ta định nghĩa một hàm trả về 1 Promise đã được resolve 

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
Sử dụng Async / Await viết lại hàm trên :

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

## Await : làm một hàm đợi Promise thực thi
> Bên trong hàm async ta có thể sử dụng thêm từ khóa là await, và chỉ có thể sử dụng await trong hàm async, nó sẽ cho phép ta chỉ định một tác vụ phải "đợi tao chạy xong".