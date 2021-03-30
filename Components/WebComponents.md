# Build Components in JavaScript Without a Framework .

Định nghĩa : **Web components**, là tập hợp các Web APIs cho phép chúng ta tạo ra một thẻ HTML riêng, mang các đặc tính riêng, đóng gói, có thể tái sử dụng. **Web components** được xây dựng trên chuẩn web hiện tại, vì thế đang (và sẽ) có thể hoạt động trên tất cả các trình duyệt, có thể tương thích với tất cả các library và framework Javascript có thể làm việc với HTML.

ví dụ :

![webComponent]()

Để làm được việc này, **Web components** bao gồm 3 công nghệ chính , có thể đc sử dụng cùng nhau để tạo các phần tử tùy chỉnh linh hoạt, với chức năng được đóng gói , có thể sử dụng ở bất cứ đâu mà không sơ conflict :

- Custom Elements 
- Shadow DOM 
- HTML templates 


## Custom elements :

note : Để đăng ký một custom element, chúng ta sử dụng function define được cung cấp bởi CustomElementRegistry có sẵn thông qua window.customElements .

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

