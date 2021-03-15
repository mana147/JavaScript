/* 
Khái niệm Callback và Higher-order function

- Callback function : là hàm được truyền vào một hàm cha khác như một tham số đầu vào, 
                    sau đó sẽ được gọi kích hoạt bên trong hàm cha này.

- Higher-order function: là hàm có hoạt động dựa trên 1 hàm khác, 
                tức là: nó có thể nhận 1 hàm làm tham số đầu vào(hàm cha trong khái niệm callback function chính là một higher-order function), hoặc sẽ return ra 1 hàm khác. Một trong 2 điều kiện đó xảy ra thì được gọi là hàm higher-order.

*/

function a(x) {
    x++;
    return function () {
        console.log(++x);
    };
}

let x = a();
x();
x();
x();