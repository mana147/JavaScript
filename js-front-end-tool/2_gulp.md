# Biết gulp là một lợi thế ! 

_copy from : https://kipalog.com/posts/Biet-gulp-la-mot-loi-the_ 

Nhiều khi đọc mấy cái bài tuyển dụng họ viết, biết gulp, biết bootstrap, biết js , biết ... là một lợi thế.

Nhiều lúc tôi cũng không hiểu nghĩa biết ở đây là biết như thế nào, biết tất cả, hay biết cái logo của nó!

Theo tôi biết là nắm rõ được lợi ích mà nó mang tới, làm được gì giúp gì.

**Gulp là một task runner giúp chúng quản lý các thư mục, các file html, css, sass, js, images ... giúp minify, compile, server auto reload v.v...**

Khi đã gọi là biết thì việc cài đặt gulp và setup nó là điều cơ bản và có khá nhiều tài liệu cũng như nhiều anh em chia sẽ rồi, tôi xin thông qua.

Ở gulp có nhiều thứ rất hay cần phải nắm nhưng tôi chỉ xin nhấn mạnh 4 API cơ bản để có thể gọi là biết gulp:

- gulp.task
- gulp.src
- gulp.dest
- gulp.watch

Okay, để dễ hình dung 4 API làm việc như thế nào, chúng ta bắt đầu quá trình đi siêu thị như sau.

## gulp.task

Đầu tiên là bạn phải lên kế hoạch đi siêu thị tức là mua gì, mua task_html, task_css, task_js ...
gulp.task bạn chỉ hiểu đơn giản là khai báo là 1 task cũng như là 1 nhiệm vụ mà bạn cần làm.

Việc cần quan tâm nhất ở gulp.task là đặt tên, bạn cứ tưởng tượng 1 hôm đẹp trời mở gulpfile.js ra và không nhớ được cái task này làm gì, phải đọc lại từng dòng code bên trong mới nhận ra rằng, mình chỉ cần đặt 1 cái tên gợi nhớ thật tốt là đã tiết kiệm được kha khá thời gian rồi ví dụ task_css task_html task_js task_img ...

```js
gulp.task('task_di_sieu_thi', function(){
    // nhiệm vụ
})
```

## gulp.src

Khi đi siêu thị, bạn phải chọn và xác định được cái địa chỉ siêu thị mà bạn đến và có khá nhiều địa chỉ đó nha.

Đó, chính nó đó gulp.src là đường dẫn cho nhiệm vụ của bạn, tức là file bạn cần đọc hay nói cách khác khi bạn muốn ai làm gì đó thì nên cung cấp cho họ địa chỉ nhất định.

Ở gulp.src bạn nên quan tâm đến các đường dẫn cũng như những folder, file cần thao tác.

Như một người đi siêu thị việc bạn quan tâm là lấy món hàng gì?
Lấy nó ở đâu?
Lấy 10 món rồi bỏ lại 1 món nhưng món này ở cùng 1 gian hàng (folder) có được hay không?

Đó là điều ta nên quan tâm ```gulp.src```
```js
gulp.task('task_file', function(){
    gulp.src('./html/*.html') // *1
    // or
    gulp.src('[./html/*.html', './css/*.css']) // *2
    // or
    gulp.src('./**/*.js') // *3
    // or
    gulp.src('[./html/*.html', '!./css/*.css']) // *4
})
```
* 1 lấy tất cả các file có đuôi .html trong folder html
* 2 lấy tất cả các file có đuôi .html trong folder html và có đuôi .css trong folder css
* 3 lấy cả thư mục chứa(js) và các file có đuôi .js
* 4 lấy tất cả các file có đuôi .html trong folder html và không lấy folder css cùng các file bên trong.

Khá nhiều thứ trong này, nhưng bạn yên tâm tôi sẽ có ví dụ cụ thể sau:
Tôi có 1 project có 2 folder a, b, trong a và b tôi có các file {1..3}.html trong a có thêm folder z và các file {a..c}.html

![PM1.png](/js-front-end-tool/img/PM1.png)

Nhiệm vụ đặt ra là tôi muốn copy:
Các file trong thư mục a,b đến thư mục dist
Các file trong z đến thư mục a.
Nhưng tôi không muốn copy file 2.html trong thư mục a tức là kết quả trong dist sẽ như sao: