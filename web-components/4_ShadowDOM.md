# Shadow DOM :

Một khía cạnh quan trọng của web components là tính đóng gói ( encapsulation ) - nó có thể giữ structure, stype và behavior, tách biệt với các code khác trên trang để các phần khác nhau không xung đột. 

API Shadow DOM là một phần quan trọng của điều này, cung cấp một cách để đính kèm một DOM được phân tách ẩn vào một phần tử. 

## High-level view :
( để hiểu đc phần này yêu cầu mọi người đọc qua bài viết 3_DOM.md )

Shadow DOM cho phép các cây DOM ẩn ( hidden DOM trees ) được gắn vào các phần tử ( elements ) trong cây DOM thông thường ( regular DOM tree ) - cây Shadow DOM này bắt đầu với một gốc (shadow root) , bên dưới có thể được gắn vào bất kỳ phần tử nào bạn muốn, theo cách giống như DOM thông thường.

![shadowdom.jpg](https://github.com/mana147/JavaScript/blob/main/web-components/img/shadowdom.jpg?raw=true)

Một số thuật ngữ cần lưu ý :

- Shadow host : nút DOM thông thường mà shadow DOM đươc gắn vào
- Shadow tree : cây DOM bên trong cây Shadow DOM 
- Shadow boundary : nơi kết thúc Shadow DOM và DOM thông thường bắt đầu.
- Shadow root : node gốc của cây shadow DOM

Một cách tổng quát, bạn tạo ra các **node DOM** và nối **append** chúng dưới dạng **children** vào **element** khác. Trong trường hợp của **Shadow DOM**, bạn tạo ra 1 cây **DOM** trong phạm vi **scoped DOM** và được kết nối vào **element** tuy nhiên nó tách biệt với **children** của chính nó. 

Cây con trong phạm vi này được gọi là **shadow tree**. **Element** mà nó nối vào được gọi là **shadow host**. Bất cứ thứ gì bạn thêm vào **shadow tree** trở thành 1 phần local của **element** chủ, bao gồm cả ```<style>```. Đây là cách mà **Shadow DOM** có được phạm vi của **CSS style**.

## Shadow tree:

Một DOM element có thể có 2 kiểu DOM subtrees (cây con):
- Light tree - một cây DOM subtrees thông thường, được tạo bằng HTML con. Tất cả các cây con mà chúng ta đã thấy trong các chương trước là "light".
- Shadow tree - một cây DOM subtrees ẩn, không được "phản ánh" trong HTML .

Shadow tree có thể được sử dụng trong Custom Elements để ẩn component internals và áp dụng apply component-local styles.

ví dụ :
```html
<!doctype html>
<head>
    <title>Page Title</title>
    <script>
        // khởi tạo class kế thừa từ HTML Element 
        class ShowName extends HTMLElement { // (1)
            constructor() {
                //  kế thừa toàn bộ thuộc tính của HTMLElement
                super();
            };
            // trình duyệt gọi phương thức này khi phần tử được thêm vào document
            connectedCallback() {
                console.log(this);     
                let getA = this.getAttribute('name');
                let shadow = this.attachShadow({mode:"open"});
                shadow.innerHTML = `<h1>  Hello , customer name ${getA} </h1>`;
                // this.innerHTML =  this.getAttribute('name');    
            };
        };
        // báo cho browser biết rằng <show-name> được cung cấp bởi class mới
        customElements.define("show-name", ShowName); // (2)
    </script>
</head>
<body>
    <!-- tạo một custom element  -->
    <show-name name="Phạm Trung Hiếu"></show-name>
</body>
```