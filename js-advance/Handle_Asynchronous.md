# Xử lý bất đồng bộ trong JavaScrip 
(Handle asynchronous calls in javascript)

*Xét chương trình bất đồng bộ sau*    
    note : 
        chương trình xử dụng webAPIs - setTimeout để giả lập tình huống lấy data từ server,
        giả sử thời gian lấy được data từ server là khác nhau .

```js
function task_1() {
    console.log('T1 > begin > read cookie');
}

function task_2() {
    setTimeout(function () {
        console.log('T2 get data from server 1 ');
    }, 10000);
}

function task_3() {
    setTimeout(function () {
        console.log('T3 get data from server 2');
    }, 1000);
}

function task_4() {
    setTimeout(function () {
        console.log('T4 get data from server 3');
    }, 5000);
}

function task_5() {
    console.log('T5 > render > end');
}

task_1();
task_2();
task_3();
task_4();
task_5();
```
copy ví dụ trên vào tool để xem cách Event Loop xử lý > 
[Toot test](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbWFpbigpIHsNCiAgICBjb25zb2xlLmxvZygiYmVnaW4iKTsNCg0KICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dCgpIHsNCiAgICAgICAgY29uc29sZS5sb2coIlRoZXJlIik7DQogICAgfSwgMTAwMCk7DQoNCiAgICBjb25zb2xlLmxvZygiZW5kIik7DQp9DQptYWluKCk7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

console.log :
```
> T1 > begin > read cookie
> T5 > render > end
> T3 get data from server 2
> T2 get data from server 1 
> T4 get data from server 3
```
Chúng ta có thể thấy các task trả về không theo thứ tự , vì thời gian xử lý là khác nhau .

Question : 
- vậy làm sao để các task thực hiện theo đúng thứ tự ?
- trường hợp các task trả về error ?
- task nào hoàn thành xong trước ?
- task nào xử lý quá thời gian mà không trả lại kết quả ?
- vv...

*Vậy trong JavaScript chúng ta có các cách xử lý bất đồng bộ như sau :*
- Callback 
- Promise
- Async / Await


# Sử dụng Callback (ES5)

    Giải thích : Callback hiểu đơn giản là truyền một hàm B vào hàm A dưới dạng 1 tham số, 
    một lúc nào đó thì hàm A sẽ gọi hàm B để chạy.

ví dụ :
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
```
> copy ví dụ trên vào tool để xem cách Event Loop xử lý 

console.log 
```
> T1 > begin > read cookie
> T2 get data from server 1 
> T3 get data from server 2
> T4 get data from server 3
> T5 > render > end
```
Các task đã trả về kết quả đúng thứ tự , nhưng thời gian xử lý tăng lên , các câu lệnh lồng vào nhau chúng ta gọi là callback hell .

# Sử dụng Promise (ES6):

    Giải thích : hiểu đơn giản , Promise nghĩa là "lời hứa" đại diện cho giá trị chưa tồn tại và giá trị đó sẽ được trả về vào một thời gian trong tương lai.

ví dụ : Chức năng lấy data từ server , tôi "hứa" sẽ lấy đc data từ server, trường hợp lấy đc data thành công tôi "thực hiện lời hứa" , nếu đứt mạng hoặc server hỏng ... tôi "thất hữa" . 

code hóa chức năng trên bằng promise : 

```js

// Hàm này trả ra lời hứa chứ không phải data

const hua_lay_du_lieu = new Promise(function (thuc_hien_loi_hua, that_hua) {
    //  chỉ một trong 2 trường hợp thuc_hien_loi_hua hoặc that_hua đc thực hiện 

    //  giả sử chương trình lấy data mất 2s

    //  đây là webAPIs bất đồng bộ

    setTimeout(function () {
        // sau khi lấy đc thì trả về kết quả 
        let data = 'data la 123456 ';
        // chuyền data vào thưc hien lơi hua
        thuc_hien_loi_hua(data);
    }, 2000);


    // that_hua('err');
});

//  Lời hứa bây giờ đang là thực hiện 

//  .then() nếu nó giữ lời thì nó sẽ trả ra data

//  .catch() nếu nó xù thất hữa , thì trả ra err

//  .finally() cuối cùng thì dù nó có giữ lời hứa hay thất hứa thì cũng thực hiện 

hua_lay_du_lieu
    //then(): Dùng để xử lý sau khi "hứa" được thực hiện thành công (khi thuc_hien_loi_hua có data ).
    .then(function (ket_qua) {
        console.log("ket qua: ", ket_qua);
    })
    // catch(): Dùng để xử lý sau khi "Hứa" có bất kỳ lỗi nào đó (khi that_hua được gọi).
    .catch(function (err) {
        console.log("Error: ", err);
    })
```


     
    
Ví dụ : để dễ hiểu chúng ta có chương trình " pha cà phê " như sau : 
- xay cà phê = 3 phút
- cho cà phê vào phin = 5 phút 
- lấy sữa = 2 phút
- pha chế = 1 phút

giải sử theo tuần tự chúng ta có : xay cà phê > cho cà phê vào phin > lấy sữa > pha chế > done, nhưng chúng ta muốn tất cả chạy cùng 1 lúc để đỡn tốn thời gian . 



