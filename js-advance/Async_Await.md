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

## Await : nó sẽ cho phép ta chỉ định một tác vụ phải "đợi tao chạy xong".

giải thích : hiểu đơn giản là dừng việc thực thi hàm cho đến khi thằng Promise được giải quyết xong .

