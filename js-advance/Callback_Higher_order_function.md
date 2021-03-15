## Khái niệm Callback và Higher-order function:

Tryền hàm A vào hàm B,
- hàm A đc gọi là callback 
- hàm B đc gọi là Higher-order-function 

- Callback function : (bản thân từ callback cũng cho chúng ta hiểu nôm na là được gọi và thực thi sau ) 
là hàm được truyền vào một hàm cha khác như một tham số đầu vào,sau đó sẽ được gọi kích hoạt bên trong hàm cha này.

- Higher-order function: 
    là hàm có hoạt động dựa trên 1 hàm khác, tức là: nó có thể nhận 1 hàm làm tham số đầu vào
    (hàm cha trong khái niệm callback function chính là một higher-order function), 
    hoặc sẽ return ra 1 hàm khác. Một trong 2 điều kiện đó xảy ra thì được gọi là hàm higher-order.


```js
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
```


## Callback thường xuất hiện ở đâu trong Javascript:

note : Trong Js, nếu xét ở phía client, ngoài những đoạn code xử lí tuần tự thông thường, ta có 2 hoạt động tương đối khác biệt so với những ngôn ngữ server khác, đó là:

- Lắng nghe event: lắng nghe sự kiện click chuột, bấm phím, hover ...
```js
$("li").click(function() {
     alert("li tag Clicked");
 });
```

- Xử lí bất đồng bộ: Đặc trưng nổi bật của JS là khả năng xử lí bất đồng bộ, 
        có thể kể đến vài hoạt động như: gọi AJAX, đọc file dạng async, …
```js
function successCallback( jqXHR ) {
   console.log('success');
}

function errorCallback( jqXHR ) {
   console.log('error');
}

$.ajax({
   url: "http://fiddle.jshell.net/favicon.png",
   success: successCallback,
   error: errorCallback
});
```

## Vấn đề gặp phải khi sử dụng Callback

### Vấn đề với con trỏ "this"
- Khi một hàm được kích hoạt, bản thân nó sẽ có một giá trị tham chiếu tới đối tượng vừa gọi nó, giá trị nó nằm ở con trỏ this.
- Ta có thể truyền hàm callback đi bất kì đâu ta muốn, tức là đối tượng kích hoạt hàm callback này chính là hàm higher-order chứa nó.
- Tuy nhiên, trong nhiều trường hợp khi thiết kế hàm callback, người dùng mong muốn con trỏ this của hàm callback là 1 đối tượng cụ thể nào khác chứ không phải là hàm higher-order.

```js
var obj = {
    method: function() {
        console.log(this);
    }
};
var a = obj.method;
a(); // this là window
$('#button').click(obj.method); // this đã tham chiếu đến button chứ không phải window
```
note :  tìm hiểu về hàm bind, call, apply và arrow function thì có thể hoàn toàn kiểm soát được contex của con trỏ this .
