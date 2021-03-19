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