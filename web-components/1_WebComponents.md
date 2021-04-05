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
