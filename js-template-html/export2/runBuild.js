/* 
bài toán : sau khi có file index.html ,user sẽ chia nhỏ thành các file con .html và đặt trong folder template ,

yêu cầu :  khi user chạy lệnh node runBuild.js 
		tool sẽ tự động xử lý các file con .html bên trong folder template và ghép vào cấu trúc của index.html
		sau đó tạo một bản ghi vào trong thư mục build với tên trung với tên index.html

ý tưởng xử lý : 
- tạo file buffer.html 
- đọc file index.html check tất cả các TAG build .
- đưa tất cả các string < TAG build > vào trong một file  
- 
	    
*/


// khai báo các biến cần thiết
var fs = require('fs');
var path = require('path');
var Templator = require('../template-html-tool/index.js');
var { exec } = require("child_process");


let build_index = './build/index.html';
// // command returns the current directory:
// let currentPath = process.cwd();
// let PATH_template = currentPath + '/template/';
// console.log(PATH_template);


// // path
// var path = require('path');
// console.log(path.resolve())

let index = new Templator('./index.html').processCheckTag('./template/');
console.log(index);


function dirTree(filename) {
	var stats = fs.lstatSync(filename),
		info = {
			path: filename,
			name: path.basename(filename)
		};

	if (stats.isDirectory()) {
		info.type = "folder";
		info.children = fs.readdirSync(filename).map(function (child) {
			return dirTree(filename + '/' + child);
		});
	} else {
		// Assuming it's a file. In real life it could be a symlink or
		// something else!
		info.type = "file";
	}

	return info;
}

// let dir_tree_template = dirTree('template');
var dir_tree_template = JSON.stringify(dirTree('template'));

console.log(dir_tree_template);

fs.writeFileSync(build_index, dir_tree_template);