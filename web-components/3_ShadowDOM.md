# Shadow DOM :

## Định nghĩa DOM 
DOM : là viết tắt của chữ Document Object Model ( mô hình các đối tượng trong tài liệu HTML)
là một chuẩn được định nghĩa bởi W3C dùng để truy xuất và thao tác trên các tài liệu có cấu trúc dạng HTML hay XML bằng các ngôn ngữ lập trình thông dịch (scripting language) như Javascript .

Ngoài ra, DOM giúp thao tác dữ liệu theo mô hình hướng đối tượng. Các phần tử bên trong 1 tài liệu có cấu trúc được định nghĩa thành các đối tượng, phương thức và thuộc tính để có thể truy xuất dễ dàng mà vẫn đảm bảo tính cấu trúc: mỗi phần tử là một đối tượng, sở hữu các thuộc tính và các phương thức để làm việc với các thuộc tính đó như thêm, xóa, sửa, cập nhật. 

Bên cạnh đó, bạn cũng có thể thêm bớt các phần tử tùy thích, giúp cho nội dung và cấu trúc của trang web luôn cập nhật động.

## Cây cấu trúc DOM

### Nút

Đối với HTML DOM, mọi thành phần đều được xem là 1 nút (node), được biểu diễn trên 1 cây cấu trúc dạng cây gọi là DOM Tree. Các phần tử khác nhau sẽ được phân loại nút khác nhau nhưng quan trọng nhất là 3 loại: nút gốc (document node), nút phần tử (element node), nút văn bản (text node).

- Nút gốc: chính là tài liệu HTML, thường được biểu diễn bởi thẻ ```<html>```.
- Nút phần tử: biểu diễn cho 1 phần tử HTML.
- Nút văn bản: mỗi đoạn kí tự trong tài liệu HTML, bên trong 1 thẻ HTML đều là 1 nút văn bản. Đó có thể là tên trang web trong thẻ ```<title>```, tên đề mục trong thẻ ```<h1>```, hay một đoạn văn trong thẻ ```<p>```.
- Ngoài ra còn có nút thuộc tính (attribute node) và nút chú thích (comment node).

![nodeDOM](https://github.com/mana147/JavaScript/blob/main/web-components/img/nodeDOM.png?raw=true)

### Quan hệ giữa các nút

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

![TP-Phan-cap-DOM-Tree.png](https://github.com/mana147/JavaScript/blob/main/web-components/img/TP-Phan-cap-DOM-Tree.png?raw=true)

### Thao tác với DOM

Việc thao tác với DOM rất quan trọng, vì mọi nội dung đều có thể được cập nhật động thông qua các thuộc tính và phương thức của DOM. Tất tần tật từ thay đổi định dạng chữ, nội dung chữ đến thay đổi cấu trúc các nút và cả thêm nút mới, bạn đều có thể làm được. Do đó, để sáng tạo nội dung tốt, bạn cần hiểu rõ cách thao tác DOM và ý nghĩa của từng thuộc tính, phương thức.

Thuộc tính và phương thức thường gặp

| Thuộc tính  | ý nghĩa  |
| ------------ | ------------ |
| id	|  Định danh – là duy nhất cho mỗi phần tử nên thường được dùng để truy xuất DOM trực tiếp và nhanh chóng. |
| className |	Tên lớp – Cũng dùng để truy xuất trực tiếp như id, nhưng 1 className có thể dùng cho nhiều phần tử.|
| tagName |	Tên thẻ HTML.|
| innerHTML |	Trả về mã HTML bên trong phần tử hiện tại. Đoạn mã HTML này là chuỗi kí tự chứa tất cả phần tử bên trong, bao gồm các nút phần tử và nút văn bản.|
| outerHTML |	Trả về mã HTML của phần tử hiện tại. Nói cách khác, outerHTML = tagName + innerHTML.| 
| textContent |	Trả về 1 chuỗi kí tự chứa nội dung của tất cả nút văn bản bên trong phần tử hiện tại.| 
| attributes |	Tập các thuộc tính như id, name, class, href, title…| 
| style |	Tập các thiết lập định dạng của phần tử hiện tại.|
|value	|Lấy giá trị của thành phần được chọn thành một biến.|

| Thuộc tính  | ý nghĩa  |
| ------------ | ------------ |
| getElementById(id)|	Tham chiếu đến 1 nút duy nhất có thuộc tính id giống với id cần tìm.|
| getElementsByTagName(tagname)|	Tham chiếu đến tất cả các nút có thuộc tính tagName giống với tên thẻ cần tìm, hay hiểu đơn giản hơn là tìm tất cả các phần tử DOM mang thẻ HTML cùng loại. Nếu muốn truy xuất đến toàn bộ thẻ trong tài liệu HTML thì hãy sử dụng document.getElementsByTagName('*').|
|getElementsByName(name) |	Tham chiếu đến tất cả các nút có thuộc tính name cần tìm.|
| getAttribute(attributeName)	|Lấy giá trị của thuộc tính.|
|setAttribute(attributeName, value)|	Sửa giá trị của thuộc tính.|
| appendChild(node)|	Thêm 1 nút con vào nút hiện tại.|
| removeChild(node)|	Xóa 1 nút con khỏi nút hiện tại.|

Mặt khác, các phần tử DOM đều là các nút trên cây cấu trúc DOM. Chúng sở hữu thêm các thuộc tính quan hệ để biểu diễn sự phụ thuộc giữa các nút với nhau. Nhờ các thuộc tính quan hệ này, chúng ta có thể truy xuất DOM gián tiếp dựa trên quan hệ và vị trí của các phần tử.

| Thuộc tính quan hệ  | ý nghĩa  |
| ------------ | ------------ |
|parentNode	|Nút cha|
|childNodes	|Các nút con|
|firstChild	|Nút con đầu tiên|
|lastChild|	Nút con cuối cùng|
|nextSibling|	Nút anh em liền kề sau|
|previousSibling|	Nút anh em liền kề trước|

## Truy xuất DOM

### Truy xuất gián tiếp

    Thao tác truy xuất các nút gián tiếp theo vị trí trên cây DOM còn được gọi là duyệt cây DOM (DOM Tree traversal).

Mỗi nút trên cây DOM đều có 6 thuộc tính quan hệ để giúp bạn truy xuất gián tiếp theo vị trí của nút
- **Node.parentNode** : tham chiếu đến nút cha của nút hiện tại, và nút cha này là duy nhất cho mỗi nút. Do đó, nếu bạn cần tìm nguồn gốc sâu xa của 1 nút, bạn phải nối thuộc tình nhiều lần, ví dụ Node.parentNode.parentNode.
- **Node.childNodes** : tham chiếu đến các nút con trực tiếp của nút hiện tại, và kết quả là 1 mảng các đối tượng. Lưu ý rằng, các nút con không bị phân biệt bởi loại nút, nên kết quả mảng trả về có thể bao gồm nhiều loại nút khác nhau.
- **Node.firstChild**: tham chiếu đến nút con đầu tiên của nút hiện tại, và tương đương với việc gọi ```Node.childNodes[0]```.
- **Node.lastChild**: tham chiếu đến nút con cuối cùng của nút hiện tại, và tương đương với việc gọi ```Node.childNodes[Element.childNodes.length-1]```.
- **Node.nextSibling**: tham chiếu đến nút anh em nằm liền kề sau với nút hiện tại.
- **Node.previousSibling**: tham chiếu đến nút anh em nằm liền kề trước với nút hiện tại.
![tp_dom_tree_traversal.png]()

