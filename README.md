# JavaScript Reference :
_Tổng hợp kiến thức và demo liên quan đến JavaScript_

<!-- link các bài viết hay :
- https://soaica.dev/index.php/2020/02/14/ten-goi-va-truong-hop-su-dung-cac-web-component-hay-gap/

- https://viblo.asia/p/tim-hieu-kien-thuc-co-ban-ve-api-maGK7A4Mlj2?fbclid=IwAR3fFepuj58hbZtVVpxWTG3afN9y-w21r1P_J0DU7d0NmNgTx_zdc4cl3AU

- https://growupcareer.com/2020/04/14/10-mo-hinh-kien-%E2%80%8B%E2%80%8Btruc-phan-mem-pho-bien/

- https://github.com/Asabeneh/30-Days-Of-Reac

- https://itviec.com/blog/software-architect-la-gi/

- http://laptoplinhkien.vn/san-pham/1615-thay-man-hinh-laptop-dell-vostro-5460-v5460.html

- https://4lap.vn/mua-ban-thay-the-man-hinh-laptop-dell-vostro-5460-5470.html 

- https://tapit.vn/huong-dan-viet-dac-ta-thiet-ke-qua-mot-du-nhung-don-gian/

- https://developer.okta.com/blog/2018/05/08/build-video-chat-app-with-javascript-webrtc-and-okta

- https://viblo.asia/p/su-ket-hop-hoan-hao-cua-scrapy-va-splash-giai-phap-toi-uu-voi-trang-web-su-dung-javascript-Qbq5Qa8w5D8?fbclid=IwAR0cfB8Zp2QlzIB5RoMjMy6q_DmicPf1_pU-_IyLXXVCM-nNlgCcxwHZaSw

- https://techmaster.vn/posts?author=188

- https://kipalog.com/posts/Co-ban-ve-async-await-trong-javascript

- https://viblo.asia/p/oauth2-nhung-dieu-chung-ta-khong-nen-bo-qua-WAyK8AooZxX?fbclid=IwAR02cyvZDWWs1GirIzPq_ULSW3AtOREJf20CFpzUGDTYVzH7JFIBJ8w-XKI

- https://viblo.asia/p/cac-cau-hinh-can-thiet-cho-mot-du-an-react-native-vyDZOAkQ5wj

- https://code.visualstudio.com/docs/languages/jsconfig

- https://kipalog.com/posts/Config-alias-chuan-trong-webpack

- https://morioh.com/p/2b2f35b7c7b8

-->

---



## Tổng hợp các câu lệnh NPM (Node Package Manager) cơ bản

Kiểm tra phiên bản cài đặt NPM

> npm --v

Cập nhật NPM lên phiên bản mới nhất

> npm install -g npm@latest
> npm update npm -g

Khởi tạo một dự án NodeJS

> npm init

Tìm kiếm các thư viện

> npm search [search terms]

Gỡ bỏ mọi thư viện đã cài đặt

> npm uninstall

Cài đặt gói thư viện bất kỳ có trên https://www.npmjs.com Package sẽ được thêm vào dependencies trong file package.json

> npm install package-name@version --save

Package sẽ được thêm vào devDependencies trong file package.json

> npm install package-name@version --save-dev

Package sẽ được thêm vào optionalDependencies trong file package.json

> npm install package-name@version --save-optional

Cài đặt package từ Github mà không có trên https://www.npmjs.com

> npm install @username/package-name
> npm i user/repo
> npm i user/repo#master
> npm i github:user/repo

Cài đặt package từ GitLab mà không có trên https://www.npmjs.com

> npm install gitlab:username/package-name

Cài đặt từ Git

> npm install git://github.com/substack/node-browserify.git

Cài đặt package theo kiểu global

> npm install -g package-name@version
> npm install -g @angular/cli

Cài đặt tất cả các packages được liệt kê trong file package.json

> npm install

Cập nhật production packages

> npm update

Cập nhật dev packages

> npm update --dev

Cập nhật global packages

> npm update -g

Cập nhật riêng lẻ từng package theo tên

> npm update package-name

Liệt kê tất cả các packages

> npm ls
> npm list

Kiểm tra outdated packages

> npm outdated

Chạy các câu lệnh cài đặt trong package.json

> npm run script-cmd-name

Một số câu lệnh có sẵn mà NPM tự hiểu

> npm start
> npm test

Liệt kê tất cả các cấu hình cho NPM

> npm config ls -l
