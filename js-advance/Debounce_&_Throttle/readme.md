# Khái niệm : Debounce và Throttle

Debounce và Throttle đều là hai phuơng pháp dùng để điều khiển một hàm được gọi bao nhiêu lần, trong khoảng thời gian xác định. Tuy nhiên cách hoạt động có khác nhau đôi chút

## Throttle

Throttle giới hạn số lần gọi hàm trong một khoảng thời gian. Ví dụ khi một hàm dùng throttle, throttle sẽ gọi hàm này nhiều nhất 1 lần mỗi x mili giây với x là khoảng thời gian mà ta cài đặt.

Ví dụ event scroll với 1 event listener .on('scroll') và hàm f chả hạn, trong điều kiện bình thường hàm f sẽ được gọi 1000 lần trong 10 giây nếu ta scroll liên tục và không có can thiệp gì. Nếu ta sử dụng throttle, cho phép event listener kích hoạt mỗi 100 mili giây, thì hàm f sẽ chỉ được gọi 100 lần là nhiều nhất trong vòng 10 giây bạn scroll

## Debounce

Không giống như Throttle, Debounce sẽ giữ trigger rate của event listener là 0 kể cả khi event được thực hiện. Và sau một khoảng thời gian mà event không được thực hiện, event listener mới được trigger và hàm được gọi.

Quay lại với event scroll ở ví dụ trên ✌️ Với việc sử dụng debounce, khi bạn scroll liên tục, debounce sẽ giúp cho hàm f không bị gọi lần nào (thay vì gọi 1000 lần hay 100 lần). Hàm f sẽ chỉ được gọi sau một khoảng thời gian mà event scroll không được thực hiện nữa. Nếu bạn cài đặt thời gian debounce là 100 mili giây và scroll liên tục trong 10 giây, thì hàm f sẽ đựoc gọi là giây thứ 10,1

# Cách cài đặt

Hai thư viện phổ biến mà tích hợp sẵn debounce và throttle là Underscore và Lodash. Các ví dụ ở dưới đây đều dùng Lodash

### Throttle:
```js
$("body").on('scroll', .throttle(function() {
  // code logic vào đây
}, 100));
```

### Debounce
```js
$("body").on('scroll', .debounce(function() {
  // lại code logic vào đây
}, 100));
```

> link video tutorial :
https://www.youtube.com/watch?v=vsl4my0Ot-s
