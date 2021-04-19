# Các công cụ front end .

Bài viết này thể hiện ý kiến của tôi về cách tiếp cận để hiểu ý nghĩa của các công cụ front end.

## Có thể chia các công cụ ra làm 2 loại chính là: "installing" và "doing"
Các công cụ làm 2 điều:

- Cài đặt thứ gì đó "installing" .
- Làm gì đó "doing" .

Câu hỏi đầu tiên bạn tự đặt ra cho mình khi xem xét một công cụ mới là: "Công cụ này được phát minh để cài đặt thứ gì đó cho tôi, hay để làm gì đó cho tôi?".

## Các công cụ "Installing" : 

Giống như npm, Bower, và Yeoman có thể cài đặt khá nhiều thứ. Chúng có thể cài đặt các các thư viện front-end như Angular.js hoặc React.js. Chúng có thể cài đặt các server cho môi trường phát triển của bạn. Chúng có thể cài đặt các thư viện kiểm thử. Thậm chí chúng có thể giúp bạn cài đặt các công cụ front-end khác.

Tóm lại, chúng cài đặt mọi thứ liên quan tới code mà bạn có thể nghĩ ra.

## Các công cụ "doing"  :

Giống như Grunt, Webpack, Require.js, Brunch và Gulp phức tạp hơn nhiều. Mục đích của các công cụ "doing" là tự động hóa tất cả các task lặp đi lặp lại và kiểm tra lỗi trong quá trình phát triển. Những thứ chúng làm đôi khi được gọi là "tasks".

Để làm các "tasks" chúng thường sử dụng các package và plugin trong hệ sinh thái của mình. Mỗi công cụ viết các task theo nhiều cách khác nhau. Chúng cũng không làm mọi thứ giống nhau. Một vài công cụ loại "doing" cố gắng xử lý mọi task bạn vứt cho chúng (Grunt, Gulp, ...). Một số khác tập trung vào một thứ, chẳng hạn xử lý các Javascript dependencies (Browserify, Require.js, ...).Đôi khi bạn sẽ sử dụng nhiều công cụ trong cùng một dự án. 

Đây là danh sách các task ví dụ , tự động hóa với các công cụ loại "doing":

- Thay thế một chuỗi của văn bản trong file
- Tạo ra các thư mục và di chuyển các file vào các thư mục đó
- Chạy các unit test với chỉ một lệnh duy nhất
- Refresh trình duyệt của tôi khi thay đổi code và lưu lại
- Kết hợp tất cả các file JavaScript vào một file, và tương tự với các file CSS
- Minify các file JavaScript và CSS đã được nối
- Chỉnh sửa vị trí của các thẻ ```<script>``` trên trang html

Khi đã hiểu công cụ nào dùng để cài đặt, cái nào dùng để làm một thứ gì đó, việc phân loại chúng trở lên dễ dàng hơn:

![installing-doing.png](/js-front-end-tool/img/installing-doing.png)


