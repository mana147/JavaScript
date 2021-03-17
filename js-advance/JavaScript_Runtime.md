# JavaScript Engine : 
V8 JS Engine bao gồm hai thành phần chính :

![v8-engine.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/v8-engine.png?raw=true)

- Memory Heap: cấp phát , quản lý , giải phóng bộ nhớ.
- Call Stack: ngăn xếp nơi chứa các lời gọi hàm khi code được thực thi.

note :  JavaScript đã giới thiệu nó là một ngôn ngữ đơn luồng, cũng có nghĩa là nó chỉ có một Call Stack và một lúc chỉ làm một việc, suy ra các task chạy đồng bộ (Synchronous). Vậy để tránh bị blocking khi gặp các task nặng hoặc mất thời gian như đọc file , lấy data từ server , setTimer ...  và tiếp tục chạy code trong call stack , JS đã dựa vào môi trường thực thi ( browser and nodeJS ) để chạy bất đồng bộ ( Asynchronous) các task này . vd webAPI , AJAX , Timer ... 

Question : 
- Các API như AJAX, setTimeout hay DOM ... ở đâu ?
- Cách JS xử lý các tác vụ nặng và chạy bất đồng bộ như thế nào ?

# JavaScript Runtime :
JS Runtime là browser's JS runtime environment , ở đây chúng ta chỉ tìm hiểu trên browser :

![js-runtime-big-picture](https://github.com/mana147/JavaScript/blob/main/js-advance/img/js-runtime-big-picture.png?raw=true)

- Các webAPIs như AJAX, setTimeout hay DOM không nằm trong JS Engine.
- Sử dụng Event Loop, Callback queue, WebAPIs  để xử lý bất đồng bộ.

xét ví dụ sau :
```js
function main() {
    console.log("begin");

    setTimeout(function timeout() {
        console.log("set timer");
    }, 1000);

    console.log("end");
}
main();
```