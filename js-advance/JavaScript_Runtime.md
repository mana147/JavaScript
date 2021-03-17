# JavaScript Engine : 
V8 JS Engine bao gồm hai thành phần chính :

![v8-engine.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/v8-engine.png?raw=true)

- Memory Heap: cấp phát , quản lý , giải phóng bộ nhớ.
- Call Stack: ngăn xếp nơi chứa các lời gọi hàm khi code được thực thi.

    note :  
        
        JavaScript đã giới thiệu nó là một ngôn ngữ đơn luồng, cũng có nghĩa là nó chỉ có một Call Stack và một lúc chỉ làm một việc, suy ra các task chạy đồng bộ (Synchronous).
        
        Vậy để tránh bị blocking khi gặp các task nặng hoặc mất thời gian như đọc file , lấy data từ server , setTimer ...  và tiếp tục chạy code trong call stack , JS đã dựa vào môi trường thực thi ( browser and nodeJS ) để chạy bất đồng bộ ( Asynchronous) các task này . vd webAPI , AJAX , Timer ... 

Question : 
- Các API như AJAX, setTimeout hay DOM ... ở đâu ?
- Cách JS xử lý các tác vụ nặng và chạy bất đồng bộ như thế nào ?

# JavaScript Runtime :
JS Runtime là browser's JS runtime environment , ở đây chúng ta chỉ tìm hiểu trên browser :

![js-runtime-big-picture](https://github.com/mana147/JavaScript/blob/main/js-advance/img/js-runtime-big-picture.png?raw=true)

- Các webAPIs như AJAX, setTimeout hay DOM không nằm trong JS Engine.
- Sử dụng Event Loop, Callback queue, WebAPIs  để xử lý bất đồng bộ. Chúng chạy trên các thread riêng và được browser bảo trợ về concurrency.


xét ví dụ sau :
```js
function main() {
    console.log("begin");

    setTimeout(function timeout() {
        console.log("There");
    }, 1000);

    console.log("end");
}
main();
```
Thực thi : 
-   hàm main đc gọi vào stack.
-   sau đó console sẽ in "begin" ra đầu tiên.
-   setTimeout được gọi với một async callback là timeout , nó sẽ đc đẩy sang webAPIs và chạy hết thời gian nó đc set
-   console "end" đc in ra
-   setTimeout sau khi chạy hết time nó đc đẩy xuống hàng đợi Callback Queue.
-   Event loop là đợi cho Call Stack rỗng rồi xem Callback Queue có gì không , nếu có thì bốc cái đầu tiên bỏ vào Call Stack để chạy.
-   lúc này console "There" sẽ đc in ra sau cùng 

kết quả 
```log
 > begin
 > end
 > There
```


Kích vào đây để xem demo : [DEMO](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbWFpbigpIHsNCiAgICBjb25zb2xlLmxvZygiYmVnaW4iKTsNCg0KICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dCgpIHsNCiAgICAgICAgY29uc29sZS5sb2coIlRoZXJlIik7DQogICAgfSwgMTAwMCk7DQoNCiAgICBjb25zb2xlLmxvZygiZW5kIik7DQp9DQptYWluKCk7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)


chú ý :
UI được browser render một cách mượt mà nhất với con số lý tưởng là 60 fps , tức là cứ khoảng 16.6ms thì vẽ lại màn hình một lần. Nhưng thực tế vì nhiều nguyên nhân khác nhau, render bị ảnh hưởng bởi việc chạy code JavaScript. Browser không thể gọi render() nếu có code JS cần chạy trong CallStack, nó phải đợi cho CS rỗng mới chạy được. Chỉ khác một chút là render() được ưu tiên hơn so với các callback thông thường. Cứ mỗi 16ms, một lời gọi render() sẽ được đưa vào hàng đợi và đến khi CS rỗng thì mới được thực thi.

Suy ra, nếu bạn block CS quá lâu thì UI sẽ bị đơ, user chẳng thể click lên button hay edit text được nữa.