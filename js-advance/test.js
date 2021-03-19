// const hua_lay_du_lieu = new Promise(function (thuc_hien_loi_hua, that_hua) {
//     //  chỉ một trong 2 trường hợp thuc_hien_loi_hua hoặc that_hua đc thực hiện 

//     //  giả sử chương trình lấy data mất 2s

//     //  đây là webAPIs bất đồng bộ

//     setTimeout(function () {
//         // sau khi lấy đc thì trả về kết quả 
//         let data = 'data la 123456 ';
//         // chuyền data vào thưc hien lơi hua
//         thuc_hien_loi_hua(data);
//     }, 2000);


//     // that_hua('err');
// });


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
//     })
    
// ====================================================================
//  tất cả các task thực hiện cùng lúc, 
console.time('Execution Time');

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

Promise.all([task_1, task_2, task_3, task_4, task_5])
    .then(function (ket_qua) {
        console.log(ket_qua);
        console.timeEnd('Execution Time');
    })
    .catch(function (err) {
        console.log(err);
    })
