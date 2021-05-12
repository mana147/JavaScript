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
- từ cấu trúc thư mục lấy đc đường dẫn đến các file.html (done)
- tìm kiếm path thư mục chứa file .html theo key name tags trong file template
*/

// khai báo các biến cần thiết
var Templator = require('../template-html/teamplate.js');
var fs = require('fs');

let build_index_html = './build/index.html';

let index_html = 'index.html';
let folder_template = 'template';

let indexHtml = new Templator(index_html);


// main
// check xem trong file index.htmnl có thẻ nào là builf tag không

if (indexHtml.processCheckBuildTag() == true) {
	// lấy tất cả các build tag bên trong  file index.html
	indexHtml.processGetBuildTag();
	// lấy tên của keyname sau từ khóa build và lưu vào mảng 
	indexHtml.processGetNameBuildTag();
	// lấy cấu trúc thư mục của thư mục template và lưu vào biến .PathFileHtml 
	indexHtml.processDirTree(folder_template);
}
// console.log(indexHtml);

let numbCheck = 0;

while (1) {

	// lấy tên build tag đầu tiên trong mảng 
	let keyName = indexHtml.NameBuildTags[0];
	// lấy path đến file theo keyname đã có bên trên trong mảng các Path file đã chuẩn bị trước
	const path_ = indexHtml.getPathViaName(keyName , indexHtml.PathFileHtml);
	// show pathfile
	// console.log(path_); if (typeof path_ == "undefined") break;
	// check path file nếu không có thì break khỏi vòng while 1 

	// đọc file , replace các build tag bằng các content đã đọc qua file
	const value = indexHtml.processFile(path_);
	
	if (value.length === indexHtml.template.length) {
		break;
	} else {		
		// cập nhật lại data trong template
		indexHtml.template = value;
	}

	// check xem trong template còn build tag không

	// console.log(indexHtml);
	
	indexHtml.NameBuildTags.shift();

	if (indexHtml.processCheckBuildTag() === true) {
		
		// console.log('true');
	
		// console.log(indexHtml.NameBuildTags.length);

		if (indexHtml.NameBuildTags.length === 0) {

			indexHtml.processGetBuildTag();

			indexHtml.processGetNameBuildTag();

			console.log(indexHtml.NameBuildTags);
		}

	} else {
		// console.log('false');
		// fs.writeFileSync(build_index_html, indexHtml.template);
		break;
	}

	// numbCheck++; if (numbCheck == 8) break;
}

console.log(indexHtml);

fs.writeFileSync(build_index_html, indexHtml.template);





