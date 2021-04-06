
- nói qua một chút thông tin ngoài lề , cho mọi người hiểu về lý do tại sao em tìm hiểu và viết list bài giới thiệu về WebComponents cũng như nó phối hợp thế nào với sản phẩm mọi người đang làm.

- hiện tại thì cả team mình đang code theo cách xử lý truyền thống mô hình Model – View – Controller có kết hợp với cả AJAX để load dữ liệu và đây là kiểu cơ chế server-side rendering và phần lớn logic sẽ được xử lý ở server . 

ưu điểm : 
    1 load nhanh, dễ otpimize, vì toàn bộ dữ liệu đã được xử lý ở server. Client chỉ việc hiển thị.
    2 Dễ hiểu và dễ code hơn. Developer chỉ cần code 1 project web là được, không cần phải tách ra front-end và back-end
    3 Chạy được trên phần lớn mọi trình duyệt, kể cả disable JavaScript vẫn chạy tốt

nhươc điểm :
    1 Mỗi lần người dùng chuyển trang là site phải load lại nhiều lần, gây khó chịu
    2 Nặng server vì server phải xử lý nhiều logic và dữ liệu. Có thể sử dụng caching để giảm tải.
    3 Tốn băng thông vì server phải gửi nhiều dữ liệu thừa và trùng  (HTML, header, footer). Có thể sử dụng CDN để giảm tải.
    4 Tương tác không tốt , load lại nhiều lần.


- việc em giới thiệu load bài WebComponents là để bước đầu chúng ta dần dần bọc các thành phần hiểu thị lại có thể tái sử dụng mở đầu cho việc tách ra front-end và back-end nếu chúng ta không sử dụng framework phía front-end 

- ý nghĩa của việc này nằm ở chỗ là chúng ta sẽ tách được nghiệp vụ ra không bị chồng chéo lên nhau 
- ví dụ anh Toàn phía back-end sẽ thiết kế một bộ APIs , bộ APIs này có tính chất mở rộng , chỉ cân viết một lần thôi , bên phía bọn em là front-end sau này chỉ cần móc ra để sử dụng . sẽ đỡ 