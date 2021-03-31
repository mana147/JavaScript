# Web components .

Định nghĩa : **Web components**, là tập hợp các Web APIs cho phép chúng ta tạo ra một thẻ HTML riêng, mang các đặc tính riêng, đóng gói, có thể tái sử dụng. **Web components** được xây dựng trên chuẩn web hiện tại, vì thế đang (và sẽ) có thể hoạt động trên tất cả các trình duyệt, có thể tương thích với tất cả các library và framework Javascript có thể làm việc với HTML.

ví dụ :

![webComponent](https://github.com/mana147/JavaScript/blob/main/web_components/img/webComponent.png?raw=true)

Ngoài ra chúng ta có ví dụ điển hình cho **Web components** là tag HTLM < video >

![tagVideoHtml](https://github.com/mana147/JavaScript/blob/main/web_components/img/tagVideoHtml.png?raw=true)

shadow DOM của tag < video >

![tagVideoHtmlDOM](https://github.com/mana147/JavaScript/blob/main/web_components/img/tagVideoHtmlDOM.png?raw=true)


Để làm được việc này, **Web components** bao gồm 3 công nghệ chính , có thể đc sử dụng cùng nhau để tạo các phần tử linh hoạt , với tính năng được đóng gói và sử dụng ở bất cứ đâu mà không sơ conflict :

- **Custom Elements** : các thành phần có thể tùy chỉnh đc
- **Shadow DOM** : cây DOM ẩn 
- **HTML templates** : bao gồm 2 element < template > và < slot >

## Custom elements :

### * Phần tử HTML (HTML element) là gì :

![HTMLelements](https://github.com/mana147/JavaScript/blob/main/web_components/img/HTMLelements.png?raw=true)

HTMLElement đại diện cho mọi phần tử HTML. Một vài phần tử sử dụng trực tiếp interface này, một vài phần tử khác lại sử dụng nó thông qua các lớp khác kế thừa nó.

![HTMLElement_inherits](https://github.com/mana147/JavaScript/blob/main/web_components/img/HTMLElement_inherits.png?raw=true)


### * Phần tử HTML tùy chỉnh ( Custom HTML elements ) là gì :

Hiểu đơn giản là chúng ta có thể tự tạo một HTML_Elements sau đó viết tính năng và đặt tên theo cách của riêng mình, với các mô tả bởi class của chúng, các phương thức và thuộc tính, sự kiện riêng, v.v..

ví dụ :
```html
<phamhieu-time date=datetime="2019-12-01"> ngày 01 tháng 12 năm 2019 </phamhieu-time>
```

### * Cách tạo ( Custom HTML Elements ) :
_note_ : có 2 loại custom elements 
- Autonomous custom elements : "all-new" elements , mở dộng từ lớp HTMLElement 
- Customized built-in elements : đây là loại kế thừa từ các phần tử HTML cơ bản

Cấu trúc Custom_HTML_Elements :

1 : Tạo một class MyElement kế thừa từ lớp HTMLElement
```js
class MyElement extends HTMLElement {
  constructor() {
    //  kế thừa toàn bộ thuộc tính của HTMLElement
    super(); 
    // element created
  }

  //  các phương thức bên trong 

  connectedCallback() {
    // trình duyệt gọi phương thức này khi phần tử được thêm vào 
    // (có thể được gọi nhiều lần nếu một phần tử được thêm / bớt nhiều lần)
  }

  disconnectedCallback() {
    // trình duyệt gọi phương thức này khi phần tử bị xóa khỏi tài liệu 
    // (có thể được gọi nhiều lần nếu một phần tử được thêm / bớt nhiều lần)
  }

  static get observedAttributes() {
    return [/* mảng tên thuộc tính để theo dõi các thay đổi */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // được gọi khi một trong các thuộc tính được liệt kê ở trên được sửa đổi
  }

  adoptedCallback() {
    // được gọi khi phần tử được chuyển sang new document 
    // (xảy ra trong document.adoptNode, rất hiếm khi được sử dụng)
  }

  // có thể có các phương thức và thuộc tính phần tử khác
}
```
2 : Sau đó, chúng ta cần đăng ký phần tử:
```js
// báo cho browser biết rằng <my-element> được cung cấp bởi class mới
customElements.define("my-element", MyElement);
```
3 : Bây giờ đối với bất kỳ element HTML nào có thẻ < my-element >, thì một phiên bản của MyElement được tạo và các phương thức nói trên được gọi
```html
<my-element> context </my-element>
```

### Autonomous custom elements :
_note_ : Tên phần tử HTLM mới do mình tạo ra phải có dấu gạch ngang ( - ) ví dụ :```  my-element , phamhieu-element ```. Tên không hợp lệ ``` myelements ``` .
















ví dụ : chúng ta muôn viết 1 elements kế thừa từ html tiêu chuẩn < p > 
  
tạo một class định nghĩa các chức năng và mở rộng HTMLParagraphElement 
```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Element functionality written in here
    ...
  }
}
```
Đăng kí custom element bằng phương thức CustomElementRegistry.define() 

Phần tử được gọi word-count, đối tượng lớp của nó là WordCount, và nó mở rộng < p > phần tử.
```js
customElements.define('word-count', WordCount, { extends: 'p' });
```
sử dụng trong HTML
```html
<p is="word-count"></p>
```

