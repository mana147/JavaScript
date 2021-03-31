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

### * Tìm hiểu phần tử HTML (HTML element) là gì :

![HTMLelements](https://github.com/mana147/JavaScript/blob/main/web_components/img/HTMLelements.png?raw=true)

HTMLElement đại diện cho mọi phần tử HTML. Một vài phần tử sử dụng trực tiếp interface này, một vài phần tử khác lại sử dụng nó thông qua các lớp khác kế thừa nó.

![HTMLElement_inherits](https://github.com/mana147/JavaScript/blob/main/web_components/img/HTMLElement_inherits.png?raw=true)


### * Tìm hiểu phần tử HTML tùy chỉnh ( Custom HTML elements ) là gì :

Hiểu đơn giản là chúng ta có thể tự tạo một HTML_Elements sau đó viết tính năng và đặt tên theo cách của riêng mình, với các mô tả bởi class của chúng, các phương thức và thuộc tính, sự kiện riêng, v.v..

ví dụ :
```html
<phamhieu-time date=datetime="2019-12-01"> ngày 01 tháng 12 năm 2019 </phamhieu-time>
```

### * Cách tạo Custom HTML Elements :
_note_ : có 2 loại custom elements 
- Customized built-in elements 



- Customized built-in elements : đây là loại kế thừa từ các phần tử HTML cơ bản

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



ví dụ : code js
```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
```
ví dụ : gọi ra trong html
```html
<!DOCTYPE html>
 <html>
  <head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
   <my-element> <h1>This is my element</h1> </my-element>
  </body>
</html>
```

