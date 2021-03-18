# Quá trình đồng bộ (Synchronous): 

giải thích : 
    
    Về cơ bản thì quá trình này gồm các câu lệnh được thực hiện theo thứ tự lần lần lượt, 
    câu lệnh thứ nhất phải hoàn thành thì mới có thể thực hiện câu lệnh thứ hai , ...


Code JavaScript không sử dụng bất kỳ API Web không đồng bộ nào sẽ thực thi theo cách đồng bộ — tuần tự từng dòng code một. Điều này được chứng minh bằng đoạn code trong ví dụ sau:

```js
// Define three example functions
function first() { console.log(1) }
function second() { console.log(2) }
function third() { console.log(3) }

// Execute the functions
first()
second()
third()
```
```js
> Output:
> 1
> 2
> 3
```

- Ưu điểm: Do các câu lệnh được chạy lần lượt nên sẽ dễ kiểm soát hơn, ngoài ra nếu có bất kỳ lỗi nào thì chương trình cũng sẽ dừng lại mà không chạy tiếp.

- Hạn chế: Đôi khi chúng ta cần lấy dữ liệu từ bên ngoài (đọc file, lấy dữ liệu từ DB, ...) nên sẽ cần một thời gian chờ nhất định. Nếu chúng ta thực hiện theo kiểu đồng bộ, thì thời gian chạy của toàn bộ chương trình sẽ bằng tổng thời gian thực hiện từng câu lệnh một

> Điều này có thể làm giảm hiệu năng của chương trình. Ví dụ ta cần đọc 100 file, mỗi file cần 0.5s ==> Tổng thời gian chạy chương trình sẽ là 50s.

[syn.png](syn.png)








// Asynchronous

function task_1(callback) {
    console.log('T1 > begin > read cookie');
    callback();
}

function task_2(callback) {
    setTimeout(function () {
        console.log('T2 get data from server 1 ');
        callback();
    }, 10000);
}

function task_3(callback) {
    setTimeout(function () {
        console.log('T3 get data from server 2');
        callback();
    }, 1000);
}

function task_4(callback) {
    setTimeout(function () {
        console.log('T4 get data from server 3');
        callback();
    }, 5000);
}

function task_5() {
    console.log('T5 > render > end');
}

// task_1(function () { });
// task_2(function () { });
// task_3(function () { });
// task_4(function () { });
// task_5(function () { });

//  callback hell
function main() {
    
    task_1(function () {
        task_2(function () {
            task_3(function () {
                task_4(function () {
                    task_5();
                })
            });
        });
    });
}
main();
