# DOM - Document Object Model :

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

![nodeDOM](https://github.com/mana147/JavaScript/blob/main/js-web-components/img/nodeDOM.png?raw=true)

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

![TP-Phan-cap-DOM-Tree.png](https://github.com/mana147/JavaScript/blob/main/js-web-components/img/TP-Phan-cap-DOM-Tree.png?raw=true)

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
![tp_dom_tree_traversal.png](https://github.com/mana147/JavaScript/blob/main/js-web-components/img/tp_dom_tree_traversal.png?raw=true)

### Truy xuất trực tiếp

Truy xuất trực tiếp sẽ nhanh hơn, và đơn giản hơn khi bạn không cần phải biết nhiều về quan hệ và vị trí của nút. Có 3 phương thức để bạn truy xuất trực tiếp được hỗ trợ ở mọi trình duyệt:

- document.getElementById('id_cần_tìm')
- document.getElementsByTagName('div')
- document.getElementsByName('tên_cần_tìm'

![Truy-xuat-DOM-truc-tiep.png](https://github.com/mana147/JavaScript/blob/main/js-web-components/img/Truy-xuat-DOM-truc-tiep.png?raw=true)

Các trình duyệt hiện đại sau này (IE8+) có hỗ trợ thêm các phương thức truy xuất mạnh mẽ và linh hoạt hơn nhiều, thậm chí hỗ trợ truy xuất theo vùng chọn CSS phức tạp như vùng chọn jQuery (một thư viện Javascript mạnh và đáng dùng để tối ưu hóa hiệu quả công việc cũng như tiết kiệm thời gian).

- ```document.querySelector('#id p.class')```: truy xuất đến vùng chọn và trả về kết quả tham chiếu đầu tiên.
- ```document.querySelectorAll('#id p[class^=test]')```: tương tự querySelector nhưng trả về mảng các tham chiếu.
- ```document.getElementsByName('class1 class2')```: tham chiếu đến tất cả các nút có thuộc tính className chứa tất cả các tên lớp cần tìm.

## Tạo thêm hoặc di chuyển DOM với appendChild

Như bạn đã biết, mọi nút trên cây cấu trúc DOM đều bắt nguồn sâu xa từ nút gốc và bắt buộc phải có 1 nút cha. Do đó, về bản chất, khi 1 DOM mới được tạo ra, nó cô đơn 1 mình và không thể sử dụng được như các phần tử DOM thông thường. Chỉ sau khi bạn tìm 1 nút khác trên cây DOM để làm cha đứa bé (sử dụng nút_cha.appendChild(nút_con)) thì quá trình tạo thêm DOM hoàn tất. Nếu bạn đã sẵn sàng để tạo vài em bé thì hãy cùng nhau tạo vài nút mới với 2 phương thức sau:

- document.createElement(tên_thẻ_html): tạo 1 nút phần tử từ nút gốc.
- document.createTextNode(chuỗi_kí_tự): tạo 1 nút văn bản từ nút gốc.

    Khi bạn tạo 1 nút mới nhưng chưa gán nút cha cho nó, nút đó sẽ tồn tại trong bộ nhớ đệm của máy tính. Bạn sẽ không thể truy xuất đến nút đó được, trừ khi bạn đã lưu tham chiếu đến nút đó bằng 1 biến.

Một lưu ý khi tạo thêm DOM: nút mới được tạo sẽ vẫn có các thuộc tính và phương thức như 1 nút DOM thực thụ. Tuy nhiên, các thuộc tính của nút mới sẽ ở trạng thái rỗng hoặc mặc định, nên bạn sẽ phải thiết lập thêm các thuộc tính cần thiết.

```js
var babyDom = document.createElement('div');
babyDom.id = 'Whatsapp';
babyDom.class = 'OTP-Messenger';
 
var fatherDom = document.getElementById('Facebook');
fatherDom.appendChild(babyDom);
```

Phương thức appendChild còn được sử dụng để tổ chức “tái định cư” cho các nút DOM. Nếu như 1 nút DOM đang có 1 nút cha, nhưng lại được 1 nút cha khác “nhận nuôi” thông qua appendChild thì nó sẽ cắt đút quan hệ với nút cha cũ để về bên gia đình mới.

```js
var child = document.getElementById('Motorola');
var oldFather = document.getElementById('Google');
// Google mua Motorola
oldFather.appendChild(child);
 
var newFather = document.getElementById('Lenovo');
// Lenovo mua lại Motorola
fatherDom.appendChild(child);
```

## Loại bỏ DOM với removeChild

    Khi bạn loại bỏ 1 nút, nút đó vẫn sẽ tồn tại trong bộ nhớ đệm của máy tính. Bạn sẽ không thể truy xuất đến nút đó được nữa, trừ khi bạn đã lưu tham chiếu đến nút đó bằng 1 biến.

Khi loại bỏ DOM, nút cha sẽ sử dụng phương thức removeChild() để từ mặt 1 hoặc nhiều nút con.

```js
// Cách 1: Loại bỏ 1 nút con khi biết nút cha và nút con
var google = document.getElementById('Google');
var motorola = document.getElementById('Motorola');
google.removeChild(motorola);
 
// Cách 2: Loại bỏ 1 nút con khi chỉ biết nút con
var whatsapp = document.getElementById('Whatsapp');
if (whatsapp.parentNode) {
  whatsapp.parentNode.removeChild(whatsapp);
}
 
// Cách 3: Loại bỏ toàn bộ nút con
var body = document.getElementsByTagName('body')[0];
while (body.firstChild) {
  body.removeChild(body.firstChild);
}
```

## DOM EVENT

Sự kiện và các hàm xử lý sự kiện DOM là một phần quan trọng của Javascript. Sự kiện sẽ xảy ra khi có sự tương tác từ người dùng (như sự kiện onclick khi người dùng nhấn chuột , onmousemove khi chuột di chuyển..) hoặc từ chính trang web (sự kiện onload khi một phần tử DOM nào đó đã được tải xong hay khi cửa sổ bị thay đổi kích thước). Bạn có thể tham khảo thêm danh sách sự kiện rút gọn ở W3Schools hoặc danh sách đầy đủ của Mozilla.

### Sử dụng sự kiện và hàm xử lý sự kiện 

Cách 1: Chèn trực tiếp vào thẻ HTML
```html
<!DOCTYPE html>
<html>
<body>

<h1>The onclick Event</h1>
<p>The onclick event is used to trigger a function when an element is clicked on.</p>
<p>Click the button to trigger a function that will output "Hello World" in a p element with id="demo".</p>
<button onclick="myFunction()">Click me</button>
<p id="demo"></p>
<script>
function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}
</script>
</body>
</html>
```
Cách này nhanh chóng và dễ sử dụng với hầu hết lập trình viên, nhưng sẽ phức tạp hóa code, không tiện khi xây dựng các ứng dụng lớn. Do đó, mình khuyến khích bạn nên sử dụng 2 cách bên dưới hơn.

Cách 2: Chèn vào thuộc tính sự kiện của DOM
```html
<!DOCTYPE html>
<html>
<body onload="myFunction()">

<h1>Hello World!</h1>

<script>
function myFunction() {
  alert("Page is loaded");
}
</script>

</body>
</html>

```
Lưu ý là, sau khi toàn bộ các phần tử DOM đã được xử lý thì sự kiện onload sẽ xảy ra, dẫn đến việc gọi hàm myFunction()

Cách 3: Dùng phương thức addEventListener()

Ví dụ 1: Xây dựng chức năng khi nhập dữ liệu vào ô input thì hiển thị giá trị của ô input đó ra bên ngoài
Với bài này ta sử dụng sự kiện onkeyup và bỏ đi chữ on sẽ là keyup.
```html
<html>
    <body>
        <input type="text" id="txt-val" value="" />
        <div id="result"></div>
        <script language="javascript">
            // Lấy đối tượng
            var input = document.getElementById("txt-val");
             
            // Thêm sự kiện cho đối tượng
            input.addEventListener('keyup', function(){
                // Gán giá trị vào div
                document.getElementById('result').innerHTML = input.value;
            });
        </script>
    </body>
</html>
```