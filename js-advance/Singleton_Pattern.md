# Singleton Pattern : 
_note:_
-   Một class chỉ có thể là một đối tượng.
-   Một class chỉ được instance một đối tượng.
-   Thể hiện truy cập của một đối tượng dễ dàng.
-   Kiểm soát được khởi tạo của chúng nó.
    
_ý nghĩa :_

    Singleton là một object chỉ khởi tạo duy nhất một lần,nghĩa là nó chỉ tạo một instance mới 
    của một class nếu chưa tồn tại instance nào, còn nếu có thì nó chỉ việc trả lại instance đó,
    suy ra dù có gọi hàm khởi tạo nhiều lần thì chúng ta cũng chỉ nhận được một object duy nhất, 
    giúp tránh lãng phí bộ nhớ.



## JavaScript đã xây dựng sẵn singleton như là một tính năng, được gọi là object literal :

vd:
```js
const user = {
    name: 'Peter',
    age: 25,
    job: 'Teachcer',
    greet: function () {
        console.log('Hello!');
    }
}

console.log(user.name); // prints 'Peter'

// giải thích  :
// mỗi object trong JavaScript chiếm một vùng trong bộ nhớ 
// và khi gọi tới object user , chúng ta nhận được một tham chiếu tới nó
```

vd: nếu thử gán biến user vào một biến khác và thay đổi biến đó
```js
const user1 = user;
user1.name = 'Mark'

console.log(user.name); // prints 'Mark'
console.log(user1.name); // prints 'Mark'
console.log(user === user1); // true

// giải thích :
// Điều này làm thay đổi cả 2 object bởi vì JavaScript truyền tham chiếu chứ không phải truyền giá trị.
// Vậy nên vẫn chỉ có duy nhất một object trong bộ nhớ
```

_note : xem lại 2 bài 13_Value_types_vs_Reference_types và 7_Enhanced_object_literals_


## Thực thiện Singleton pattern như module :

```js
const mySingleton = (function () {
    let instance;
    
    function init() {
        // private Method
    
        let private_Random_Number = Math.random();
        let private_String_text = 'public method';
        let private_String_name = 'Peter';
        let private_Number_age = 24;

        return {
            public_String_Name : private_String_name ,
            public_Number_age : private_Number_age ,
            
            public_String_text : function () {
                return private_String_text;
            },
            
            public_Random_Number: function () {
                return private_Random_Number;
            }
        }
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            // instance = init();
            // console.log(instance);
            return instance;
        }
    }
})();

console.log(mySingleton.getInstance);

var myInstance_1 = mySingleton.getInstance();
var myInstance_2 = mySingleton.getInstance();
// var myInstance_3 = mySingleton.getInstance();

console.log(myInstance_1.public_String_Name);           
console.log(myInstance_1.public_Number_age);           

console.log(myInstance_2.public_String_Name = 'hieu' );
console.log(myInstance_2.public_Number_age = 20 );     

console.log(myInstance_1.public_Random_Number());       
console.log(myInstance_2.public_Random_Number());

//  giải thích  : 
//  Chúng ta tạo một instance mới bằng cách gọi hàm singleton.getInstance 
//  Nếu một instance đã tồn tại, hàm này đơn giản chỉ trả về instance đó, 
//  Nếu instance chưa tồn tại, nó tạo một instance mới bằng hàm init()

```


vd: mẫu singleton không tốt 
```js
var myBadSingleton = ( function () {
    // Instance stores a reference to the Singleton
    var instance;
    
    function init() {
        // Singleton
        var privateRandomNumber = Math.random();
        return {
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    };

    return {
        // luôn tạo một instance mới  
        getInstance: function () {
            instance = init();
            return instance;
        }
    };
})();

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();

console.log(badSingleA.getRandomNumber() );
console.log(badSingleB.getRandomNumber() ); 

```
note : chạy chương trình để thấy kết quả 