# Quá trình đồng bộ (Synchronous): 

giải thích : 
    
    Về cơ bản thì quá trình này gồm các câu lệnh được thực hiện theo thứ tự lần lần lượt, 
    câu lệnh thứ nhất phải hoàn thành thì mới có thể thực hiện câu lệnh thứ hai , ...


- Ưu điểm: Do các câu lệnh được chạy lần lượt nên sẽ dễ kiểm soát hơn, ngoài ra nếu có bất kỳ lỗi nào thì chương trình cũng sẽ dừng lại mà không chạy tiếp.

- Hạn chế: Đôi khi chúng ta cần lấy dữ liệu từ bên ngoài (đọc file, lấy dữ liệu từ DB, ...) nên sẽ cần một thời gian chờ nhất định. Nếu chúng ta thực hiện theo kiểu đồng bộ, thì thời gian chạy của toàn bộ chương trình sẽ bằng tổng thời gian thực hiện từng câu lệnh một

ví dụ : 

![syn.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/syn.png?raw=true)

*Quá trình đồng bộ có thể làm giảm hiệu năng của chương trình. Ví dụ ta cần đọc 100 file, mỗi file cần 0.5s ==> Tổng thời gian chạy chương trình sẽ là 50s.*

Trong JavaScript :

Code JS không sử dụng bất kỳ API Web không đồng bộ nào sẽ thực thi theo cách đồng bộ — tuần tự từng dòng code một. Điều này được chứng minh bằng đoạn code trong ví dụ sau:

```js
// Define three example functions
function first() { console.log(1) }
function second() { console.log(2) }
function third() { console.log(3) }

// Execute the functions
first()
second()
third()
```
```js
> Output:
> 1
> 2
> 3
```

# Quá trình bất đồng bộ (Asynchronous)

giải thích :

    Đây là quá trình mà các câu lệnh có thể chạy cùng một lúc chứ không cần chờ câu lệnh trước

- Ưu điểm: Như đã nói, nó giúp chúng ta tối ưu được thời gian chạy của các câu lệnh. Cũng giúp chúng ta thực hiện các tác vụ mất nhiều thời gian mà không làm ảnh hưởng đến luồng chính của chương trình.

- Khuyết điểm: Chính vì các câu lệnh được thực hiện đồng thời và kết quả cũng được trả về một cách không theo thứ tự nên sẽ khó kiểm soát cũng như debug code.

ví dụ :

![asyn.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/asyn.png?raw=true)

- Với ví dụ trên, thì ta sẽ chạy đồng thời 100 câu lệnh đọc file cùng một lúc => Chúng ta sẽ chỉ mất khoảng 0.5s đến 1s thay vì 50s như lúc trước.
- Lưu ý  có thể câu lệnh thứ 2 sẽ thực hiện nhanh hơn câu lệnh 1 nên sẽ trả về kết quả sớm hơn. Do đó, kết quả của các câu lệnh cũng có thể được trả về không theo thứ tự gọi bạn đâu.

Trong JavaScript: 

Khi sử dụng API Web không đồng bộ, các quy tắc trở nên phức tạp hơn. 

Ví dụ API setTimeout, đặt bộ đếm thời gian và thực hiện một hành động sau một khoảng thời gian cụ thể. setTimeout cần phải không đồng bộ, nếu không toàn bộ trình duyệt sẽ vẫn bị đóng băng trong thời gian chờ, dẫn đến trải nghiệm người dùng kém.

```js
function first() {
  console.log(1)
}

function second() {
  setTimeout(() => {
    console.log(2)
  }, 0)
}

function third() {
  console.log(3)
} 

// Execute the functions
first()
second()
third()
```
```log
Output:
1 // first()
3 // third()
2 // second()
```
giải thích : 

Cho dù đặt thời gian chờ thành 0 giây hay năm phút sẽ không có gì khác biệt — console.log được gọi bằng code không đồng bộ sẽ thực thi sau các chức năng đồng bộ. Điều này xảy ra vì môi trường máy chủ JavaScript, trong trường hợp này là trình duyệt, sử dụng một khái niệm gọi là vòng lặp sự kiện để xử lý các sự kiện đồng thời hoặc song song. Vì JavaScript chỉ có thể thực thi một câu lệnh tại một thời điểm, nó cần vòng lặp sự kiện được thông báo về thời điểm thực thi câu lệnh cụ thể nào. Vòng lặp sự kiện xử lý điều này với các khái niệm về stack and queue (ngăn xếp và hàng đợi).

note: xem lại bài JavaScript_Runtime để hiểu rõ 

copy các ví dụ trên vào tool để xem cách Event Loop xử lý > 
[Toot test](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbWFpbigpIHsNCiAgICBjb25zb2xlLmxvZygiYmVnaW4iKTsNCg0KICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dCgpIHsNCiAgICAgICAgY29uc29sZS5sb2coIlRoZXJlIik7DQogICAgfSwgMTAwMCk7DQoNCiAgICBjb25zb2xlLmxvZygiZW5kIik7DQp9DQptYWluKCk7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

## References :
- https://codelearn.io/sharing/bat-dong-bo-trong-javascript-phan-1
- https://giaphiep.com/blog/tim-hieu-ve-vong-lap-callback-promise-va-asyncawait-trong-javascript-27865
