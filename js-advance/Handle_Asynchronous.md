# Các cách xử lý bất đồng bộ trong JavaScrip 
(Handle asynchronous calls in javascript)




```js
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

task_1(function () { });
task_2(function () { });
task_3(function () { });
task_4(function () { });
task_5(function () { });

```

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
