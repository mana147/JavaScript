/* 
    ( In JavaScript, almost "everything" is an object )
    Khái niệm Callback và Higher-order function:

    Tryền hàm A vào hàm B,
    -   hàm A đc gọi là callback 
    -   hàm B đc gọi là Higher-order-function 

    * Callback function : (bản thân từ callback cũng cho chúng ta hiểu nôm na là được gọi và thực thi sau )
        là hàm được truyền vào một hàm cha khác như một tham số đầu vào, 
        sau đó sẽ được gọi kích hoạt bên trong hàm cha này.

    * Higher-order function: 
        là hàm có hoạt động dựa trên 1 hàm khác, tức là: nó có thể nhận 1 hàm làm tham số đầu vào
        (hàm cha trong khái niệm callback function chính là một higher-order function), 
        hoặc sẽ return ra 1 hàm khác. 
        Một trong 2 điều kiện đó xảy ra thì được gọi là hàm higher-order.
*/

// hàm A đc gọi là hàm callback 
function funcA () {
    return 'hello'
};
// hàm B nhận 1 hàm làm tham số đầu vào
// được gọi là hàm higher-order.
function funcB(a) {
    console.log(a());
}

funcB(funcA);

/*
    Trong Js, nếu xét ở phía client, ngoài những đoạn code xử lí tuần tự thông thường, 
    ta có 2 hoạt động tương đối khác biệt so với những ngôn ngữ server khác, đó là:
        
    - Lắng nghe event: lắng nghe sự kiện click chuột, bấm phím, hover .....
        
        - Xử lí bất đồng bộ: Đặc trưng nổi bật của JS là khả năng xử lí bất đồng bộ, 
        có thể kể đến vài hoạt động như: gọi AJAX, đọc file dạng async, …
*/ 