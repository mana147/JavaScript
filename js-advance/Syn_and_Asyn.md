# Quá trình đồng bộ (Synchronous): 

giải thích : 
    
    Về cơ bản thì quá trình này gồm các câu lệnh được thực hiện theo thứ tự lần lần lượt, câu lệnh thứ nhất phải hoàn thành thì mới có thể thực hiện câu lệnh thứ hai , ...


Code JavaScript không sử dụng bất kỳ API Web không đồng bộ nào sẽ thực thi theo cách đồng bộ — tuần tự từng dòng code một. Điều này được chứng minh bằng đoạn code trong ví dụ sau:

```js
// Define three example functions
function first() {
    console.log(1)
}

function second() {
    console.log(2)
}

function third() {
    console.log(3)
}

// Execute the functions
first()
second()
third()

// Output:
// 1
// 2
// 3
```







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
