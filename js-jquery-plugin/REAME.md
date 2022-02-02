# jQuery plugin


## #Cơ chế hoạt động của jQuery  :


```js
$("a").css( "color", "red" );

$("p").click( function () {
    console.log("click paragraph !")
});
```
giải thích :
- jQuery sử dụng cú pháp $(selector) để chọn các phần tử, ở đây là phần tử $("a"), $("p"), trả về một wrapper của các thành phần trong HTML.
- Đối tượng wrapper này cung cấp các phương thức dùng để thao tác với các thành phần HTML bên trong nó như text(), html(), hide(), show(),…
- ví dụ ở đây là .css() hoăc click() ...


## #Basic Plugin: 

cách đơn giản để viết một plug-in theo phương thức sau: 
```js
jQuery.fn.methodName = methodDefinition; 
```
rule :
- bất kỳ method hoặc hàm nào bạn đính kèm phải có một dấu chấm phảy ( ; ) ở cuối cùng.
- method của bạn phải trả về đối tượng jQuery, trừ khi có ghi chú khác.
- nên sử dụng this.each để lặp lại tập hợp các phần tử đã so khớp hiện tại
- đặt trước filename với jquery, theo sau là tên của plugin và kết thúc với .js

### Chuẩn bị : 

```
Cấu trúc 
jquery-plugin:
|- src|
|---- jquery.myPlugin.js
|---- main.js
|- index.html
```
``` html
index.html

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="src/jquery.hello.js"></script>
<script src="src/main.js"></script>

``` 

Cấu trúc trong file  ( jquery.myPlugin.js ):
```js
jquery.myPlugin.js

$(function () {

    $.fn.hello = function () {
        this.css( "color", "green" );
    }

});
```
note : 
- ( $.fn ) bắt đầu định nghĩa plugin , ở đây ta có plugin 'hello'
- plugin này sẽ chọn qua tất cả các Selectors và thay đổi color : grean'

```html
index.html

<h2> hi vcc </h2>
<h2> ha vcc </h2>
```
và gọi plugin:
```js
main.js

$(document).ready( function() {
    $('h2').hello();
});
```

# Một số đặc điểm và kỹ thuật trong jQuery

##  #Chaining in jQuery
note : xem lại ví dụ 15_Method_Chaining để hiểu cách viết cách hoạt động, 
- chú ý đến câu lệnh return this trong các phương thức của jquery obj. 
- Nếu không có nó, các phương thức của đối tượng jquery obj này sẽ không trả về một đối tượng hợp lệ để có thể tiếp tục gọi các phương thức liên tiếp nhau trong một dòng lệnh.
- Bản thân jQuery, đa số các phương thức đều trả về một đối tượng query. Khái niệm này được gọi là chaining:

=> Vậy tóm lại con trỏ this trong js dùng để đại diện cho 1 Object ( đối tượng ) , Object đó là chủ thể của ngữ cảnh, hoặc chủ thể của code đang chạy.

```js
jquery.myPlugin.js

$(function () {

    $.fn.greenify = function () {
        this.css("color", "green");
        // add return this;
        return this;
    }

});
```

gọi plugin:
```js
main.js

$(document).ready(function () {
    
    $('h2').greenify().addClass(
        function () {
            console.log('add class')
        }
    );
});
```


## #jQuery $ alias 
note : biến $ rất phổ biến trong js nếu sử dụng thư viện khác jquery , do đó để hoạt động tốt với các plug-in khác và vẫn sử dụng $ chúng ta cần đặt tất cả src code vào trong IIFE 

```js
(function ( $ ) {
 
    $.fn.greenify = function() {
        this.css( "color", "green" );
        return this;
    };
 
}( jQuery ));

```
note : Ngoài ra, mục đích chính của IIFE là cho phép chúng ta có các biến riêng . Giả sử chúng ta muốn có một màu khác là xanh lục và muốn lưu trữ nó trong một biến.
```js
(function ( $ ) {
 
    var shade = "#556b2f";
 
    $.fn.greenify = function() {
        this.css( "color", shade );
        return this;
    };
 
}( jQuery ));
```


## #jQuery .each()
giải thích : 
- jQuery .each() function được sử dụng để lặp qua từng phần tử của jQuery object .
- jQuery object là 1 object chứa 1 hoặc nhiều phần tử DOM và dùng để giao tiếp với tất cả jQuery functions. 

vd: chọn tất cả thẻ a trên trang và in ra thuộc tính href
```js
// html

<a href="http://www.jquery4u.com">JQUERY4U</a>
<a href="http://www.phpscripts4u.com">PHP4U</a>
<a href="http://www.blogoola.com">BLOGOOLA</a>

// js

$('a').each(function (index, value){
    console.log(this);
    console.log($(this));
    console.log($(this).attr('href'));
});

// giải thích $(this) = a jQuery wrapper-object around the element
```
$.each() Array Example
```js
var numbers = [1, 2, 3, 4, 5, 6];
$.each(numbers , function (index, value){
  console.log(index + ':' + value);
});

// 0:1, 1:2, 2:3, 3:4, 4:5, 5:6.
```
tương tự khi sử dụng trong plug-in
```js
$.fn.myNewPlugin = function() {
    return this.each(function() {
        // Do something to each element here.
    });
};
```

## # jQuery.extend và jQuery.fn.extend
giải thích : 
- jQuery.extend được sử dụng để mở rộng bất kỳ đối tượng nào có chức năng bổ sung

```js
var obj = { 
    x: function() {
        console.log('func x');
    }
}

$.extend( obj , { 
    y: function() {
           console.log('func y');
    } 
}); 
// obj có các functions x and y
```

- jQuery.fn.extend được sử dụng để mở rộng đối tượng jQuery.fn, trên thực tế, thêm một số hàm plugin trong một lần (thay vì chỉ định từng chức năng riêng biệt).

```js
let x = { a : 1 };
let y = { b : 2 };
$.fn.extend(a , b);
```

## # Thêm options vào plug-in
giải thích : Khi các plugin ngày càng phức tạp hơn , chúng ta nên làm cho plugin có thể tùy chỉnh bằng cách chấp nhận các option
```js
(function ( $ ) {
 
    $.fn.greenify = function( options ) {

        // tạo options defaults
        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
 
    };
 
}( jQuery ));
```
main.js
```js
$( "div" ).greenify({
    color: "orange"
});
```

## Demo jQuery plug-in
vd : viết 1 plugin cho phép thay đổi nội dung , màu chữ , fontStyle ... khi đc cắm vào các thẻ html

file > jquery.myPlugin.js
```js
(function ($) {
    
    let settings = {
        text: 'nội dung defaults',
        color: null,
        fontStyle: null,
    };

    $.fn.setColorPlugin = function (options) {

        console.log(this); // this ở đây là 3 thẻ <a> 
        console.log(typeof options); // object

        // check options 
        if (typeof options == 'object') {
            // extend 
            $.extend(settings, options);
        }

        return this.each( function () {

            $(this).text(settings.text);

            if (settings.color) {
                $(this).css('color', settings.color);
            }

            if (settings.fontStyle) {
                $(this).css('font-style', settings.fontStyle);
            }
            
            // console.log(settings.complete);
            settings.complete.call(this);

            // if ($.isFunction(settings.complete)) {
            //     console.log(this);
            // }
        });

    };

}(jQuery));
```

file > main.js
```js
let config = {
    text: 'pham trung hieu',
    color: 'red',
    fontStyle: 'italic',
    complete: function () {
        console.log('>>>>> complete');
    }
}

$('a').setColorPlugin(config);
```


