# Lập trình hướng đối tượng (Object Oriented Programing - OOP)
Giới thiệu các kiến thức cơ bản về lập trình hướng đối tượng (Object Oriented Programing - OOP) bao gồm:

+ 4 tính chất của lập trình hướng đối tượng: 
    1 - Tính đóng gói (encapsulation): Cất giấu và bảo vệ dữ liệu quan trọng bên trong class, không cho phép truy cập hay chỉnh sửa tự do từ bên ngoài.
        * Sử dụng 3 phạm vi truy cập (Access Modifiers) : 
            - public : mọi người đều có thể truy cập
            - private : chỉ class đó mới có thể truy cập , nội bộ trong class
            - protected : class đó và các class kế thừa mới có thể truy cập 

    2 - Tính trừu tượng (abstraction): Ẩn đi sự phức tạp của logic xử lý bên trong và chỉ cung cấp giao diện đơn giản ra bên ngoài, Giúp người dùng dễ sử dụng, đồng thời lập trình viên có thể nâng cấp, thay đổi logic bên trong class mà không sợ làm sập hệ thống hay làm hỏng code ở các nơi đang gọi nó miễn là giao diện (interface) không thay đổi.

    3 - Tính kế thừa (inheritance) : Cho phép class con tái sử dụng các thuộc tính và hành vi từ class cha thông qua từ khóa [ extends ] 
        Các điểm cần lưu ý:
            - Super (super()): Dùng để gọi constructor của class cha từ class con.
            - Protected : Giúp class con có thể truy cập được tài nguyên của class cha nhưng vẫn ẩn đối với bên ngoài.
            - Tránh kế thừa quá sâu : Không nên tạo cây kế thừa quá nhiều tầng vì khi sửa class gốc sẽ làm ảnh hưởng đến toàn bộ các class con cháu.

    4 - Tính đa hình (polymorphism) : Cùng một lệnh/phương thức nhưng mỗi loại đối tượng con sẽ tự xử lý theo cách riêng của nó.
        - Ghi đè (Override) : Class con viết lại phương thức kế thừa từ class cha để định nghĩa lại hành vi riêng.
        - Lợi ích: Giúp code dễ dàng mở rộng, thêm các đối tượng/tính năng mới mà không cần chỉnh sửa lại luồng xử lý cũ

+ 2 Khái Niệm Mở Rộng Quan Trọng

    1 - Interface (Hợp đồng):
        - Là một bản hợp đồng quy định các phương thức bắt buộc phải có, nhưng không chứa code thực thi bên trong.
        - Class nào ký hợp đồng (implements) thì phải tự viết logic chi tiết cho các phương thức đó.
        - Khác với Class cha (chỉ được extends 1 class), một class có thể thực thi (implements) nhiều Interface cùng lúc.

    2 - Composition (Quan hệ Thành phần): 
        - Nguyên lý lắp ghép các bộ phận (các class độc lập) vào bên trong một class chính thay vì dùng kế thừa
        - Giải quyết vấn đề của kế thừa sâu hoặc trường hợp một đối tượng cần tích hợp nhiều chức năng từ nhiều nguồn khác nhau (do OOP không hỗ trợ đa kế thừa)
        



# Các khái niệm cơ bản về lớp (class), đối tượng (object), gói (package).

## Đối tượng (Object)

Đối tượng trong OOP bao gồm 2 thành phần chính:

- Thuộc tính (Attribute): là những thông tin, đặc điểm của đối tượng
- Phương thức (Method): là những hành vi mà đối tượng có thể thực hiện

Để dễ hình dung, ta có một ví dụ thực tế về đối tượng là smartphone. Đối tượng này sẽ có:

- Thuộc tính: màu sắc, bộ nhớ, hệ điều hành…
- Phương thức: gọi điện, chụp ảnh, nhắn tin, ghi âm…

## Lớp (Class)

Lớp là sự trừu tượng hóa của đối tượng. Những đối tượng có những đặc tính tương tự nhau sẽ được tập hợp thành một lớp. 

Lớp cũng sẽ bao gồm 2 thông tin là thuộc tính và phương thức.

Một đối tượng sẽ được xem là một thực thể của lớp.

Tiếp nối ví dụ ở phần đối tượng (object) phía trên, ta có lớp (class) smartphone gồm 2 thành phần:

Thuộc tính: màu sắc, bộ nhớ, hệ điều hành…
Phương thức: gọi điện, chụp ảnh, nhắn tin, ghi âm…
Các đối tượng của lớp này có thể là: iPhone, Samsung, Oppo, Huawei…
