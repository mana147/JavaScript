# GIỚI THIỆU VỀ DESIGN PATTERN :

Trong lúc chúng ta lập trình, có rất nhiều vấn đề cứ na ná nhau. Và sau khi giải quyết xong các vấn đề đó, chúng ta sẽ thấy rằng thường sẽ có một _mô hình_ chung để giải quyết các vấn đề tương tự nhau như vậy. Đó chính là lúc người ta bắt đầu nghĩ về design pattern

    Design pattern là một thuật ngữ được sử dụng trong ngành kỹ nghệ phần mềm nói chung, 
    nó chỉ ra giải pháp tái sử dụng cho việc giải quyết các vấn đề giống nhau 
    và thường xuyên ra trong quá trình phát triển phần mềm

Design pattern mang lại rất nhiều lợi ích cho chúng ta trong quá trình code. Một trong những lợi ích lớn nhất là sẽ giúp code của chúng ta dễ hiểu hơn, dễ tái sử dụng hơn.

Design pattern không phải là cách để giải quyết dứt điểm cho một bài toán cụ thể, mà nó chỉ đem đến cho chúng ta hướng giải quyết, hướng tiếp cận vấn đề một cách dễ dàng hơn.

# PHÂN LOẠI DESIGN PATTERNS :

## Creational patterns : 
    
    Nhóm patterns này cung cấp các cơ chế và quản lý việc khởi tạo đối tượng ( object creation ) 
    khác nhau phù hợp với ngữ cảnh của bài toán, giúp tăng tính linh hoạt và khả năng tái sử dụng mã hiện có.

![Creational-patterns.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/Creational-patterns.png?raw=true)

- Factory Method : đúng nghĩa là một **nhà máy** ( factory ), và nhà máy này sẽ sản xuất các **đối tượng** (object) theo yêu cầu của chúng ta.
- Abstract Factory : như là một nhà **máy lớn** chứa nhiều **nhà máy** nhỏ, trong các nhà máy đó có những xưởng sản xuất **đối tượng** ...
- Builder : được tạo ra để xây dựng một **đối tượng** phức tạp bằng cách sử dụng các **đối tượng** đơn giản và sử dụng tiếp cận từng bước, xây dựng các **đối tượng** đôc lập với các **đối tượng** khác.
- Prototype : ( y "nguyên" cái "mẫu" đấy) nó có nhiệm vụ khởi tạo một **đối tượng** bằng cách **clone** một **đối tượng** đã tồn tại thay vì khởi tạo với từ khoá **new** .  
- Singleton : là một mẫu thiết kế cho phép bạn đảm bảo rằng một class chỉ có một trường hợp, đồng thời cung cấp một điểm truy cập toàn cục cho trường hợp này.

## Structural patterns :

    Nhóm patterns liên quan tới cấu trúc các thành phần và lớp đối tượng. 
    Chúng giúp ta có thể bổ sung cấu trúc mới hoặc tái cấu trúc dự án theo từng phần 
    mà không làm ảnh hưởng tới các phần khác trong hệ thống.

![Structural-pattern.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/Structural-pattern.png?raw=true)

- Adapter : Bộ chuyển đổi
- Bridge : Cầu
- Composite : Tổng hợp
- Decorator : Người trang trí
- Facade : Mặt tiền
- Flyweight : Khi nhiều objects phải được xử lý mà chương trình không thể chịu nổi một lượng dữ liệu khổng lồ, thì cần dùng flyweight.
- Proxy : Proxy có nghĩa là “ủy quyền” hay “đại diện”. Mục đích xây dựng Proxy pattern cũng chính vì muốn tạo ra một đối tượng sẽ ủy quyền, thay thế cho một đối tượng khác.

## Behavioral patterns : 

    Nhóm patterns liên quan tới hành vi, chúng sẽ giúp tăng sự kết nối giữa các đối tượng khác nhau.

![Behavioral-patterns.png](https://github.com/mana147/JavaScript/blob/main/js-advance/img/Behavioral-patterns.png?raw=true)

- Chain of Responsibility : Chuỗi trách nhiệm
- Command : 
- Iterator : 
- Mediator : 
- Memento :
- Observer : 
