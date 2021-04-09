# Shadow DOM :

Một khía cạnh quan trọng của web components là tính đóng gói ( encapsulation ) - nó có thể giữ structure, stype và behavior và tách biệt với các code khác trên trang để các phần khác nhau không xung đột. 

API Shadow DOM là một phần quan trọng của điều này, cung cấp một cách để đính kèm một DOM được phân tách ẩn vào một phần tử. 

## High-level view :
( để hiểu đc phần này yêu cầu mọi người đọc qua bài viết 3_DOM.md )

Shadow DOM cho phép các cây DOM ẩn ( hidden DOM trees ) được gắn vào các phần tử ( elements ) trong cây DOM thông thường ( regular DOM tree ) - cây Shadow DOM này bắt đầu với một gốc (shadow root) , bên dưới có thể được gắn vào bất kỳ phần tử nào bạn muốn, theo cách giống như DOM thông thường.

![shadowdom.jpg](https://github.com/mana147/JavaScript/blob/main/web-components/img/shadowdom.jpg?raw=true)

- Shadow host: nút DOM thông thường mà shadow DOM đươc gắn vào
- Shadow tree: The DOM tree inside the shadow DOM.
- Shadow boundary: the place where the shadow DOM ends, and the regular DOM begins.
- Shadow root: The root node of the shadow tree.