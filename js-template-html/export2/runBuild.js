/* 
bài toán : sau khi có file index.html ,user sẽ chia nhỏ thành các file con .html và đặt trong folder template ,

yêu cầu :  khi user chạy lệnh node runBuild.js 
		tool sẽ tự động xử lý các file con .html bên trong folder template và ghép vào cấu trúc của index.html
		sau đó tạo một bản ghi vào trong thư mục build với tên trung với tên index.html

ý tưởng xử lý : 
- tạo file buffer.html 
- đọc file index.html check tất cả các TAG build (done)
- lấy đc các <!-- build:nameTags --> đưa vào một mảng (done)
- lấy đc các nameTags đưa vào một mảng (done)
- lấy đc cấu trúc cây thư mục template dưới dạng json (done)
- tìm kiếm path thư mục chứa file .html theo key name tags trong file template

*/


// khai báo các biến cần thiết
var fs = require('fs');
var path = require('path');
var Templator = require('../template-html/index.js');
var { exec } = require('child_process');


let build_index_html = './build/index.html';
let build_index_json = './build/index.json';
// // command returns the current directory:
// let currentPath = process.cwd();
// let PATH_template = currentPath + '/template/';
// console.log(PATH_template);


// // path
// var path = require('path');
// console.log(path.resolve())
// viết hàm xử lý khi cho đường dẫn file index vào 
let indexHtml = new Templator('./index.html');
// console.log(indexHtml);

let getBuildTags = indexHtml.processCheckBuildTag();
console.log(getBuildTags.BuildTags);

let getNameBuildTags = indexHtml.processCheckBuildTag().processCheckNameBuildTag();
console.log(getNameBuildTags.NameBuildTags);

let DirTemplate = indexHtml.processDirTree('template');
let JsonDirTemplate = JSON.stringify(DirTemplate);

console.log(DirTemplate.children[1]);
// fs.writeFileSync(build_index_json, JsonDirTemplate);

