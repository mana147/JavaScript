# Các công cụ front end .

_copy from :  https://www.freecodecamp.org/news/making-sense-of-front-end-build-tools-3a1b3a87043b/#.dinmrek7v_ 

Bài viết này thể hiện ý kiến của tôi về cách tiếp cận để hiểu ý nghĩa của các công cụ front end.

# Có thể chia các công cụ ra làm 2 loại chính là: "installing" và "doing"
Các công cụ làm 2 điều:

- Cài đặt thứ gì đó "installing" .
- Làm gì đó "doing" .

Câu hỏi đầu tiên bạn tự đặt ra cho mình khi xem xét một công cụ mới là: "Công cụ này được phát minh để cài đặt thứ gì đó cho tôi, hay để làm gì đó cho tôi?".

## 1 : Các công cụ "Installing" : 

Giống như npm, Bower, và Yeoman có thể cài đặt khá nhiều thứ. Chúng có thể cài đặt các các thư viện front-end như Angular.js hoặc React.js. Chúng có thể cài đặt các server cho môi trường phát triển của bạn. Chúng có thể cài đặt các thư viện kiểm thử. Thậm chí chúng có thể giúp bạn cài đặt các công cụ front-end khác.

Tóm lại, chúng cài đặt mọi thứ liên quan tới code mà bạn có thể nghĩ ra.

## 2 : Các công cụ "doing"  :

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

# Khởi đầu của tất cả các công cụ là Node và Npm : 

Node và npm cài đặt và chạy tất cả các công cụ còn lại, vì thế bạn luôn thấy chúng trong dự án của mình. Bởi vì điều này, nhiều lập trình viên cố gắng sử dụng chúng nhiều nhất có thể trước khi họ cài đặt một công cụ khác.

- Node là công cụ "doing" 
- Npm là công cụ "installing"

Npm có thể cài đặt các thư viện giống như Angular.js và React.js. Nó cũng có thể cài đặt một server để chạy ứng dụng của bạn trên local trong quá trình phát triển. Thậm chí nó có thể cài đặt các công cụ để làm những thứ giống như minify code của bạn.

Node là một trường hợp khác, nó làm một số thứ cho bạn, như chạy các file JavaScript, các server và nhiều hơn thế.

Nếu bạn cần một công cụ nào đó để bắt đầu, hãy học Node và npm trước. Khi dự án của bạn đủ lớn, bạn sẽ đạt tới giới hạn của Node và npm. Tại điểm này bạn có thể kết hợp chúng với các công cụ khác.

# Một bản build chỉ là một phiên bản production của ứng dụng :

Các lập trình viên thường chia JavaScript và CSS thành các file riêng rẽ. Chia thành các file giúp bạn tập trung vào các phần code đã được module hóa, cái chỉ làm một thứ. Các file chỉ làm một công việc sẽ giảm tải cho bạn. 

_(Nếu bạn nghĩ chia các file dễ nhầm lẫn hơn một file lớn, thử làm việc với một file 5000 dòng code, và bạn sẽ nhanh chóng thay đổi suy nghĩ)._

**Nhưng khi bạn muốn phát hành sản phẩm, có nhiều file JavaScript hoặc CSS không phải là một ý tưởng hay. Khi người dùng nghé thăm trang web của bạn, mỗi file sẽ yêu cầu một reques HTTP, điều này làm giảm tốc độ tải trang.**

    Chú ý: điều này sẽ không còn đúng trong HTTP2.  
    https://blog.cloudflare.com/http-2-for-web-developers/

Để giải quyết vấn đề này, bạn có thể tạo ra một bản "build" của ứng dựng, trộn tất cả các file CSS thành một file, và tương tự với JavaScript.

Bằng cách này, bạn có thể tối thiểu hóa số lượng và kích thước các file người sử dụng sẽ tải. Để tạo ra bản "build",  bạn sử một "build tool".

Dưới đây là màn hình của một ứng dụng trong quá trình phát triển. Bạn có để ý thấy nó có 5 thẻ ```<script>``` và 3 thẻ ```<link>```? Nếu nhìn sang phía bên trái, bạn có thấy thư mục DEVELOPMENT có tất cả 10 file?

![DEVELOPMENT1.png](/js-front-end-tool/img/DEVELOPMENT1.png)

_Ứng dụng trong quá trình phát triển_

Và dưới đây vẫn là ứng dụng đó sau khi sử một một buid tool.

Bạn có để ý thấy chúng ta chỉ có một thẻ ```<script>``` và một thẻ ```<link>``` ? Và hiện tại, thư mục PRODUCTION chỉ có 4 file , khi so sánh với 10 file của thư mục DEVELOPMENT.

![DEVELOPMENT2.png](/js-front-end-tool/img/DEVELOPMENT2.png)

_Ứng dụng sau khi build_

Bạn có thể tự hỏi tại sao một bản build lại có giá trị, nếu tất cả những gì nó làm chỉ tiết kiệm cho người sử dụng của bạn vài milisecond khi tải trang. Đúng vậy, nếu bạn chỉ xây dựng một trang web dành riêng cho bạn hoặc một vài người, bạn không cần làm điều này. 

**Tạo ra một bản build cho dự án của bạn chỉ cần thiết cho các trang web có lượng truy cập cao (hoặc các trang web mà bạn hy vọng sẽ có lượng truy cập cao).**

Nếu bạn chỉ học, hoặc chỉ tạo ra các trang web với lượng truy cập rất thấp, việc tạo ra một bản build là không cần thiết.

# Ranh giới giữa "installing" và "doing" có thể không rõ ràng :
Không có công cụ nào chỉ làm một việc. Tất cả thường làm cả "install" và "do". Nhưng nói chung, một công cụ thường thiên về một thứ.

# Không có một cách đúng nhất khi kết hợp các công cụ

Kết hợp các công cụ mà bạn sử dụng hoàn toàn phụ thuộc vào chính bạn.

Bạn có thể chọn cách không sử dụng công cụ nào. Chỉ cần nhớ rằng copy, paste, minify, khởi tạo các server, và những task khác có thể nhanh chóng trở nên quá tải.

Hoặc bạn chỉ sử dụng Node và npm mà không sử dụng thêm công cụ nào khác. Điều này là một khởi đầu tốt, nhưng khi dự án của bạn phát triển nó có thể có quá nhiều các task lặp đi lặp lại.

Hoặc bạn có thể chọn sử dụng một vài công cụ khác cùng với Node và npm trong dự án của mình. Ứng dụng của bạn sẽ sử dụng ```Node + npm``` là ```core```, và có thể kết hợp với ```Grunt + Bower``` hoặc ```Webpack``` hoặc ```Gulp + Bower```.

Sử dụng kết hợp một vài công cụ như ở trên với ```Node + npm``` giúp bạn tự động hóa một lượng lớn các task lặp đi lặp lại trong dự án của mình. Cái giá bạn phải trả khi sử dụng các công cụ này là chúng khó học và đòi hỏi nhiều nỗ lực để sử dụng.

![tool.png](/js-front-end-tool/img/tool.png)

_sắp xếp theo độ phức tạp tăng dần_


# Các công cụ khó học và đòi hỏi nhiều nỗ lực, vì vậy chỉ học những thứ cần thiết.

Xây dựng một ứng dụng đã đủ khó. Bạn có thể phải làm việc với một ngôn ngữ mới hoặc một framework mới. Hoặc bạn có thể gặp khó khăn thực sự với business logic. 

Vì thế kết hợp một công cụ có thể làm tăng tính phức tạp cho dự án của bạn. Điều này đặc biệt đúng khi một dự án đã có ai đó viết code với một công cụ.

Lời khuyên của tôi là :

**"chỉ học chính xác cái bạn cần, để làm công việc của mình và không thêm gì khác"**

Cách tốt nhất để học một thứ mới là khi bạn có một task thực sự, cái bạn cần hoàn thành. Ví dụ, đừng học cách copy các file với Grunt chỉ vì bạn muốn biết. Thay vào đó, chờ cho đến khi dự án của bạn cần, và sau đó tìm cách hoàn thành nó.

**Nhớ rằng: phức tạp sớm sẽ làm chậm tiến độ của bạn**

------------


