/*
    * JavaScript Design Pattern *
    
    Module Pattern :
    Ý nghĩa : 
        - Module là một đoạn code độc lập mà chúng ta có thể chỉnh sửa 
        mà không làm ảnh hưởng đến các phần khác của code. 
        
        - Module cũng cho phép chúng ta tránh lạm dụng namespace 
        bằng cách cho phép tạo các scope riêng biệt cho các biến. 
            
        - Có thể tái sử dụng module trong các project khác 
        vì bản chất của module là tách biệt, không phụ thuộc vào các phần code khác.
    
    
    note : Không giống như những ngôn ngữ lập trình khác,
    JavaScript không có các phương thức để định nghĩa biến public, private (hay còn gọi là access modifier). 
    Vậy nên Module Pattern được sử dụng để giả lập tính chất đóng gói của hướng đối tượng.
    
    Module Pattern trong JS dựa trên: 
        - Closure
        - Higher order function 
        - IIFE
*/

// vd :
let myModulePattern = (function () {
    
    // biến và hàm định nghĩa trong IIFE được giấu đi khỏi outer scope
    // và trở nên private với biến myModulePattern
    
    let private = 'Đây là biến private';
    
    function privateFunc() {
        console.log(`đây là hàm private + ${private}`);
    };

    // trả về các hàm và biến muốn public ra ngoài
    return {
        publicData: private,
        publicFunc: function () {
            privateFunc();
        },
    };
})();

// Bằng cách sử dụng IIFE, đoạn code trên được thực thi ngay lập tức,
//  và trả về một object để gán vào biến myModulePattern.

console.log(myModulePattern.publicData);
myModulePattern.publicFunc();

// Nhờ có closure, object trả về vẫn có thể truy cập vào các hàm và biến 
// được định nghĩa bên trong IIFE ngay cả khi IIFE đã thực thi xong.



/* 
    Revealing Module Pattern 
    RMP : có thể coi là phiên bản cải tiến của Module Pattern .
    trong modulet pattern chúng ta phải tạo các public function 
    chỉ để gọi tới các private function và variable.

    giải pháp : chúng ta map các thuộc tính của object 
    và trả về các private function mà chúng ta muốn public
*/
const myRevealingModule = (function () {
    let privateVar = 'Peter';
    const publicVar = 'Hello World';

    function privateFunction() {
        console.log('Name: ' + privateVar);
    }

    function publicSetName(name) {
        privateVar = name;
    }

    function publicGetName() {
        privateFunction();
    }

    return {
        setName: publicSetName,
        getName: publicGetName,
        greeting: publicVar,
    };
})();

// myRevealingModule.setName(' '), tham chiếu tới hàm nội tại publicSetName
myRevealingModule.setName('pham trung hieu');

// myRevealingModule.getName(), tham chiếu tới hàm nội tại publicGetName
myRevealingModule.getName();

myRevealingModule.greeting;

/*
    - có thể thay đổi từ public sang private 
        và ngược lại bằng cách thay đổi chỉ một dòng trong return statement
    
    - Object trả về không bao gồm các định nghĩa function, 
        tất cả các right-hand side expression đều được định nghĩa bên trong IIFE
*/