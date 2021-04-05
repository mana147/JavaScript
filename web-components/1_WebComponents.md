# Web components .

Định nghĩa : **Web components**, là tập hợp các Web APIs cho phép chúng ta tạo ra một thẻ HTML riêng, mang các đặc tính riêng, đóng gói, có thể tái sử dụng. **Web components** được xây dựng trên chuẩn web hiện tại, vì thế đang (và sẽ) có thể hoạt động trên tất cả các trình duyệt, có thể tương thích với tất cả các library và framework Javascript có thể làm việc với HTML.

ví dụ :

![webComponent](https://github.com/mana147/JavaScript/blob/main/web-components/img/webComponent.png?raw=true)

Ngoài ra chúng ta có ví dụ điển hình cho **Web components** là tag HTLM < video >

![tagVideoHtml](https://github.com/mana147/JavaScript/blob/main/web-components/img/tagVideoHtml.png?raw=true)

shadow DOM của tag < video >

![tagVideoHtmlDOM](https://github.com/mana147/JavaScript/blob/main/web-components/img/tagVideoHtmlDOM.png?raw=true)


Để làm được việc này, **Web components** bao gồm 3 công nghệ chính , có thể đc sử dụng cùng nhau để tạo các phần tử linh hoạt , với tính năng được đóng gói và sử dụng ở bất cứ đâu mà không sơ conflict :

- **1 : Custom Elements** : các thành phần có thể tùy chỉnh đc
- **2 : Shadow DOM** : cây DOM ẩn 
- **3 : HTML templates** : bao gồm 2 element < template > và < slot >

## 1 : Custom elements :

### * Phần tử HTML (HTML element) là gì :

![HTMLelements](https://github.com/mana147/JavaScript/blob/main/web-components/img/HTMLelements.png?raw=true)

HTMLElement đại diện cho mọi phần tử HTML. Một vài phần tử sử dụng trực tiếp interface này, một vài phần tử khác lại sử dụng nó thông qua các lớp khác kế thừa nó.

![HTMLElement_inherits](https://github.com/mana147/JavaScript/blob/main/web-components/img/HTMLElement_inherits.png?raw=true)


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
    // trình duyệt gọi phương thức này khi phần tử được thêm vào HTML document
    // (có thể được gọi nhiều lần nếu một phần tử được thêm / bớt nhiều lần)
  }

  disconnectedCallback() {
    // trình duyệt gọi phương thức này khi phần tử bị xóa khỏi HTML document
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
    _note_ : Tên phần tử HTLM mới do mình tạo ra phải có dấu gạch ngang ( - )
             Tên hợp lệ : ```  my-element , phamhieu-element ```. 
             Tên không hợp lệ : ``` myelements ```


## 1.1 Autonomous custom elements :

**DEMO 1** : xét trường hợp cơ bản sau, chúng ta có một thẻ < time > thường dùng để đánh dấu những phần văn bản là: thời gian, ngày tháng, ngày lễ, ....

```html
<p>Quán chúng tôi sẽ được khai trương vào lúc <time>11:00</time> ngày <time datetime="2017-03-08">Quốc tế Phụ nữ</time></p>
```
_note : Thuộc tính datetime dùng để đại diện cho thời gian của phần tử < time >_

Tuy nhiên thẻ < time > không có hiển thị gì đặc biệt lên màn hình , chỉ mang nhiệm vụ đánh dấu 

**Bài toán đặt ra** : chúng ta viết một thẻ mới như thẻ time nhưng hiển thị đầy đủ thông tin thời gian 

1 : Khởi tạo class
```js
class TimeFormat extends HTMLElement { // (1)
    constructor() {
        //  kế thừa toàn bộ thuộc tính của HTMLElement
        super();
    }; 
    // trình duyệt gọi phương thức này khi phần tử được thêm vào document
    connectedCallback() {
        let date ;
        // hiển thị this để hiểu rõ this ở đây là gì 
        console.log(this);
        // lấy giá trị thuộc tính của tag datetime 
        let datetime = this.getAttribute('datetime');
        // kiểm tra xem datatime có giá trị hay không
        if (datetime) {
            let date = new Date(datetime);
            console.log(`thời gian setup : ${date} `);
            this.innerHTML = date;
        } else {
            let dateNow = Date.now();
            let date = new Date(dateNow);
            this.innerHTML = `chưa có thời gian được setup , 
                              lấy thời gian hiện tại : ${date} `;
        }
    };
};
```
2 : khao báo
```js
// báo cho browser biết rằng <time-formatted> được cung cấp bởi class mới
customElements.define("time-format", TimeFormat); // (2)
```
3 : sử dụng trong HTML
```html
<time-format datetime="2019-12-01"> </time-format>
```
4: hiển thị 

![tagTime.png](https://github.com/mana147/JavaScript/blob/main/web-components/img/tagTime.png?raw=true)

**DEMO 2** : 
xét lại bài toán hiển thị thời gian trên, ngoài việc hiển thị chúng ta muốn thời gian đc tự động cập nhật và thay đổi 

Thực hiện ý tưởng :

1 : chúng ta viết 1 thẻ element mới trong html 
  - giữ nguyên thuộc tính datetime="2019-12-01" đã viết bên trên để làm ví dụ so sánh cách hoạt động 
```html
<time-formatted datetime="2019-12-01" ></time-formatted> 
```
2 : viết một hàm js có nhiệm vụ như sau
  - cứ sau 1s nó lấy thời gian thực new Date() = Mon Apr 05 2021 15:26:00 GMT+0700 (Giờ Đông Dương) 
  - sau đó tìm đến thẻ time-formatted rồi đặt thêm thuộc tính currenttime="Mon Apr 05 2021 15:26:00 GMT+0700 (Giờ Đông Dương)" vào
```js
let tagTime = document.getElementsByTagName("time-formatted");
console.log(tagTime);
// sau 1 s thực hiện hàm sau 
setInterval( function () {
    // sau đó thêm thuộc tính currenttime với giá trị = new Date()
    let value = new Date();
    // console.log(value);
    tagTime[0].setAttribute('currenttime', value);
} , 1000);
```
3 : bắt đầu viết chức năng cho element html đã tạo ra phía trên :
- khai báo tên các thuộc tính có giá trị thay đổi vào phương thưc static get observedAttributes() 
- nếu các thuộc tính đc khai báo bên trên có giá trị thay đổi thì kích hoạt attributeChangedCallback()
- sau đó truyền các tham số vào hàm rander đã tạo bên trên để hiển thị.
```js
 class TimeFormatted extends HTMLElement {
  constructor() {
      super();
  };

  render(name, oldValue, newValue) { 
      // let datetime = this.getAttribute('currenttime');
      this.innerHTML = newValue;
  };

  // trình duyệt gọi phương thức này khi phần tử được thêm vào document
  connectedCallback() {

  };

  // mảng tên các thuộc tính ( Attribute ) để theo dõi các thay đổi 
  // đưa currenttime vào danh sách các attribute cần theo dõi
  static get observedAttributes() { 
      return ['currenttime'];
  };

  // currenttime có giá trị thay đổi thì kích hoạt attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
      console.log(`
          >>> ${name}
          >>> ${oldValue}
          >>> ${newValue}
      `);
      this.render(name, oldValue, newValue);
  };
}
customElements.define("time-formatted", TimeFormatted);
```

## 1.2 Customized built-in elements :
ý nghĩa : các phần tử element mới tạo bên trên có một nhược điểm là, các công cụ tìm kiếm không biết đến vì chúng là do mình tạo lên và định nghĩa.

Nhưng chúng ta vẫn muốn viết thêm và mở rộng các tính năng của các phần tử đó. 

**DEMO 1**: giả sử chúng ta muôn viết thêm tính năng cho thẻ < p > vì google.search đọc đc thẻ < p >,
tính năng này đếm số lượng từ trong thẻ < p > < /p >

1 : trong html : tạo thẻ < p > trong đó thêm is="word-count", word-count là tên chức năng chúng ta sẽ viết cho thẻ
```html
<p> cộng hòa xã hội chủ nghĩa việt nam  </p>
<p is="word-count"></p>
```
2 : khai báo cho browser biết rằng word-count có tên class WordCount là tính năng mới đc kế thừa từ thẻ < p >
```js
customElements.define('word-count', WordCount, { extends: 'p' });
```
3 : viết class WordCount
```js        
// tạo class WordCount mở rộng từ HTMLParagraphElement
class WordCount extends HTMLParagraphElement {
    constructor() {
        super();
    }
    connectedCallback() {

        // .parentNode : tham chiếu đến nút cha của nút hiện tại,
        // .innerText : nhận vặn bản bên trong một phần tử 
        let text = this.parentNode.innerText;
        console.log(text);

        // .split() : sẽ phân tách một chuỗi thành một mảng dữ liệu dựa vào các kí tự phân cách trong chuỗi.
        let count = text.split(/\s+/g).length;
        console.log(count);

        this.innerHTML = `số lượng từ ${count}`;
    }
}

```