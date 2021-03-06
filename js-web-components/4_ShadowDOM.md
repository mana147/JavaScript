# Shadow DOM 

* _Giới thiêu về Shadow DOM_
* _Xét ví dụ cách tạo một Shadow DOM đơn giản_
* _Shadow DOM giải quyết được vấn đề gì ?_


## Giới thiêu về Shadow DOM : 

( để hiểu đc phần này yêu cầu mọi người đọc qua bài viết 3_DOM.md )

Shadow DOM cũng chỉ là 1 DOM bình thường, ngoại trừ 2 điều sau:

- Cách tạo ra / sử dụng trong mối quan hệ với toàn bộ trang so với cách mà bạn tạo / sử dụng DOM thường.
- Cách tương tác của nó trong mối quan hệ với toàn bộ trang

Shadow DOM cho phép các cây DOM "ẩn" ( hidden DOM trees ) được gắn vào các phần tử ( elements ) trong cây DOM thông thường ( regular DOM tree ) - cây Shadow DOM này bắt đầu với một gốc (shadow root) , bên dưới có thể được gắn vào bất kỳ phần tử nào bạn muốn, theo cách giống như DOM thông thường.

![shadowdom.jpg](https://github.com/mana147/JavaScript/blob/main/js-web-components/img/shadowdom.jpg?raw=true)

Một số thuật ngữ cần lưu ý :

- Shadow host : nút DOM thông thường mà shadow DOM đươc gắn vào
- Shadow tree : cây DOM bên trong cây Shadow DOM 
- Shadow boundary : là nơi mà shadow DOM kết thúc, regular DOM bắt đầu
- Shadow root : root node của shadow tree

Một cách tổng quát, bạn tạo ra các **node DOM** và nối **append** chúng dưới dạng **children** vào **element** khác. Trong trường hợp của **Shadow DOM**, bạn tạo ra 1 cây **DOM** trong phạm vi **scoped DOM** và được kết nối vào **element** tuy nhiên nó tách biệt với **children** của chính nó. 

Cây con trong phạm vi này được gọi là **shadow tree**. **Element** mà nó nối vào được gọi là **shadow host**. Bất cứ thứ gì bạn thêm vào **shadow tree** trở thành 1 phần local của **element** chủ, bao gồm cả ```<style>```. Đây là cách mà **Shadow DOM** có được phạm vi của **CSS style**.

## Xét ví dụ cách tạo một Shadow DOM đơn giản : 

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
tất cả nội dung đều nằm dưới "#shadow-root":

![demoShadowTree.png](https://github.com/mana147/JavaScript/blob/main/js-web-components/img/demoShadowTree.png?raw=true)

giải thích :
- ```elem.attachShadow({mode: … })``` tạo một shadow tree, trong đó có 2 option:
    - "open" : shadow root có hiệu lực như elem.shadowRoot , bất kì code nào cũng có thể truy cập vào shadow tree 
    - "closed" : elem.shadowRoot is always null. Chúng ta chỉ có thể truy cập vào shadow DOM bằng tham chiếu được trả về bởi attachmentShadow (và có thể ẩn bên trong một lớp). ví dụ Browser-native shadow trees , chẳng hạn như ```<input type = "range">```, bị đóng. Không có cách nào để truy cập chúng


## Shadow DOM giải quyết được vấn đề gì :

Shadow DOM được thiết kế như 1 công cụ dùng để xây dựng các app dựa trên component. Nó cung cấp các giải pháp cho các vấn đề chung trong ngành phát triển web mà chúng ta đã gặp qua.

- isolated DOM (DOM cô lập): 1 DOM của component khép kín (ví dụ: document.querySelector() không trả về các node trong Shadow DOM của component). Điều này cũng làm đơn giản hóa các CSS Selector trong webapp của bạn bởi vì các DOM component đều bị cô lập, nó cho phép bạn khả năng sử dụng chung nhiều id / class mà không lo bị xung đột về cách đặt tên.

- Scoped CSS (CSS trong phạm vi): CSS định nghĩa bên trong Shadow DOM chỉ có phạm vi trong nó. Các quy tắc về style không lọt ra ngoài và style của trang cũng không can thiệp vào nó.

- Composition (kết hợp): Thiết kế 1 API khai báo, dựa trên markup cho component của bạn.



# to continue ....
<!-- ## Tạo Shadow DOM

Một shadow root là 1 phần của document và được nối vào 1 element chủ (host element). Thời điểm bạn nối 1 shadow root chính là lúc element có được shadow DOM của nó. Để tạo shadow DOM cho 1 element, ta gọi element.attachShadow():
```js
var header = document.createElement('header');
var shadowRoot = header.attachShadow({mode: 'open'});
var paragraphElement = document.createElement('p');

paragraphElement.innerText = 'Shadow DOM';
shadowRoot.appendChild(paragraphElement);
```

## Tính kết hợp trong Shadow DOM

Tính kết hợp là 1 trong số những tính năng quan trọng nhất của Shadow DOM.

Khi viết code HTML, "kết hợp" là cách mà chúng ta xây dựng webapp. Chúng ta kết nối và cài đặt các viên gạch khác nhau (còn gọi là các element) chẳng hạn như ```<div>, <header>, <form>``` vân vân, để xây dựng UI cho webapp. Một số tag thậm chí có thể hoạt động với nhau.

Sự kết hợp định nghĩa tại sao các element như ``` <select>, <form>, <video>... ```lại linh động và chấp nhận các element HTML cụ thể làm children của nó để thực hiện các công việc đặc biệt.

Ví dụ, ```<select>``` biết cách render các element ```<option>``` thành 1 danh sách dropdown với các item được định nghĩa trước.

Shadow DOM giới thiệu các tính năng sau mà từ đó ta có thể thực hiện tính "kết hợp".    



 -->
