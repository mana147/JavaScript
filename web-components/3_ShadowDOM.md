## 2 : Shadow DOM :

### Định nghĩa DOM 
DOM : là viết tắt của chữ Document Object Model ( mô hình các đối tượng trong tài liệu HTML)
là một chuẩn được định nghĩa bởi W3C dùng để truy xuất và thao tác trên các tài liệu có cấu trúc dạng HTML hay XML bằng các ngôn ngữ lập trình thông dịch (scripting language) như Javascript .

Ngoài ra, DOM giúp thao tác dữ liệu theo mô hình hướng đối tượng. Các phần tử bên trong 1 tài liệu có cấu trúc được định nghĩa thành các đối tượng, phương thức và thuộc tính để có thể truy xuất dễ dàng mà vẫn đảm bảo tính cấu trúc: mỗi phần tử là một đối tượng, sở hữu các thuộc tính và các phương thức để làm việc với các thuộc tính đó như thêm, xóa, sửa, cập nhật. 

Bên cạnh đó, bạn cũng có thể thêm bớt các phần tử tùy thích, giúp cho nội dung và cấu trúc của trang web luôn cập nhật động.

### Cây cấu trúc DOM

Nút
Đối với HTML DOM, mọi thành phần đều được xem là 1 nút (node), được biểu diễn trên 1 cây cấu trúc dạng cây gọi là DOM Tree. Các phần tử khác nhau sẽ được phân loại nút khác nhau nhưng quan trọng nhất là 3 loại: nút gốc (document node), nút phần tử (element node), nút văn bản (text node).

- Nút gốc: chính là tài liệu HTML, thường được biểu diễn bởi thẻ ```<html>```.
- Nút phần tử: biểu diễn cho 1 phần tử HTML.
- Nút văn bản: mỗi đoạn kí tự trong tài liệu HTML, bên trong 1 thẻ HTML đều là 1 nút văn bản. Đó có thể là tên trang web trong thẻ ```<title>```, tên đề mục trong thẻ ```<h1>```, hay một đoạn văn trong thẻ ```<p>```.
- Ngoài ra còn có nút thuộc tính (attribute node) và nút chú thích (comment node).

![nodeDOM](https://github.com/mana147/JavaScript/blob/main/web-components/img/nodeDOM.png?raw=true)

Quan hệ giữa các nút

- Nút gốc (document) luôn là nút đầu tiên.
- Tất cả các nút không phải là nút gốc đều chỉ có 1 nút cha (parent).
- Một nút có thể có một hoặc nhiều con, nhưng cũng có thể không có con nào.
- Những nút có cùng nút cha được gọi là các nút anh em (siblings).
- Trong các nút anh em, nút đầu tiên được gọi là con cả (firstChild) và nút cuối cùng là con út (lastChild).

Ta hãy cùng xem ví dụ cây cấu trúc DOM bên dưới:

- Nút gốc là ```<html>```
- 2 nút anh em ```<head>``` và ```<body>``` là anh em vì đều là nút con của ```<html>``` .
- Nút ```<body>``` có 3 con, trong đó ```<h1>``` là con cả và thẻ ```<p>``` thứ 2 là con út.
- Nút phần tử ```<a>``` có 2 con, trong đó có 1 nút văn bản và 1 nút thuộc tính.

![TP-Phan-cap-DOM-Tree.png]()