# Sử dụng Promise (ES6):

    Giải thích : hiểu đơn giản , Promise nghĩa là "lời hứa" đại diện cho giá trị chưa tồn tại 
    và giá trị đó sẽ được trả về vào một thời gian trong tương lai.

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

//  .then() sau đó nó giữ lời thì nó sẽ trả ra data

//  .catch() bắt lỗi nó nếu nó thất hữa , thì trả ra err

//  .finally() cuối cùng thì dù nó có giữ lời hứa hay thất hứa thì cũng làm gì đó ...

hua_lay_du_lieu
    //then(): Dùng để xử lý sau khi "hứa" được thực hiện thành công (khi thuc_hien_loi_hua có data ).
    .then(function (ket_qua) {
        console.log("ket qua: ", ket_qua);
    })
    // catch(): Dùng để xử lý sau khi "Hứa" có bất kỳ lỗi nào đó (khi that_hua được gọi).
    .catch(function (err) {
        console.log("Error: ", err);
    })
    // .finally(): Dùng để xử lý cuối cùng dù có data hay lỗi 
    .finally(function () {
        console.log(" xử lý cuối cùng dù có ket_qua hay có err ");
    }) 
```

## Promise chaining : 

    Giá trị trả về của hàm then là 1 promise khác. 
    Do vậy ta có thể dùng promise gọi liên tiếp các hàm bất đồng bộ.

![promise](https://github.com/mana147/JavaScript/blob/main/js-advance/img/promises.png?raw=true)
    
xem ví dụ sau 

```js

let hai_ngay = 2000;

let di_rut_tien = new Promise(function (thanh_cong, that_bai) {
    setTimeout(function () {
        let sotien = 100;
        thanh_cong(sotien);
    }, hai_ngay );
});

di_rut_tien.then( function(so_tien ){
    console.log(`số tiền rút đc là : ${so_tien} vnd`);
    return so_tien;
}).then(function (so_tien_hien_co) {
    let so_tien_mua_xe = 30;
    let so_tien_con_lai = so_tien_hien_co - so_tien_mua_xe;
    console.log( `số tiền còn lại sau khi mua xe : ${so_tien_con_lai}` );
    return so_tien_con_lai;
}).then(function (so_tien_hien_co ) {
    let so_tien_mua_nha = 50;
    let so_tien_con_lai = so_tien_hien_co - so_tien_mua_nha ;
    console.log(`số tiền còn lại sau khi mua nhà : ${so_tien_con_lai}`);
    return so_tien_con_lai;
})


//  tương tự bài toán trên 
// Fetch a user from the GitHub API
fetch('https://api.github.com/users/octocat')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Xử lý bất đồng bộ với Promise: 

xét lại ví dụ trong bài Handle_Asynchronous .

```js
//  viết lại các task theo Promise

console.time('Execution Time');  // check time

let task_1 = new Promise( function (thanh_cong, that_bai) {
    let data = 'T1 > begin > read cookie';
    thanh_cong(data);
});

let task_2 = new Promise( function (thanh_cong, that_bai) {
    setTimeout(function () {
        let data = 'T2 get data from server 1 ';
        thanh_cong(data);
    }, 1000);
});

let task_3 = new Promise( function (thanh_cong, that_bai) {
    setTimeout(function () {
        let data = 'T3 get data from server 2';
        thanh_cong(data);
    }, 1000);
});

let task_4 = new Promise( function (thanh_cong, that_bai) {
    setTimeout(function () {
        let data = 'T4 get data from server 3';
        thanh_cong(data);
    }, 1000);
})

let task_5 = new Promise( function (thanh_cong, that_bai) {
    let data = 'T5 > render > end';
    thanh_cong (data);
})

```

> Sử dụng phương thức Promise.all([promise1, promise2, ...]).

```js
// cac task trả kết quả theo đúng thứ tự 
Promise.all([task_1, task_2, task_3, task_4, task_5])
    .then(function (ket_qua) {
        console.log(ket_qua);
        console.timeEnd('Execution Time');
    })
    .catch(function (err) {
        console.log(err);
    })
```
console.log :  
```log
[
  'T1 > begin > read cookie',
  'T2 get data from server 1 ',
  'T3 get data from server 2',
  'T4 get data from server 3',
  'T5 > render > end'
]
Execution Time: 1010.151m
```
Giải thích :

Phương thức này nhận vào một mảng các promises và chỉ resolve khi tất cả các promises này hoàn thành, hoặc reject khi một trong số chúng xảy ra lỗi.

![Promiseall](https://github.com/mana147/JavaScript/blob/main/js-advance/img/Promiseall.jpg?raw=true)


> Sử dụng phương thức Promise.race([promise1, promise2, ...])
```js
Promise.race([task_1, task_2, task_3, task_4, task_5])
    .then(function (ket_qua) {
        console.log(ket_qua);
        console.timeEnd('Execution Time');
    })
    .catch(function (err) {
        console.log(err);
    })
```
console.log :
```log
// nó chỉ chạy mỗi task 1 vì nó chạy xong đầu tiên 
T1 > begin > read cookie
Execution Time: 10.219ms
```
giải thích :

Phương thức này nhận vào một mảng các promises và sẽ resolve/reject ngay khi một trong số các promises này hoàn thành/xảy ra lỗi.

![Promiserace](https://github.com/mana147/JavaScript/blob/main/js-advance/img/Promiserace.jpg?raw=true)