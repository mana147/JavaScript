// khai báo các biến cần thiết  
var fs = require('fs');
var path = require('path');
var Templator = require('/root/.nvm/versions/node/v12.18.4/lib/node_modules/template-html/index');

// khai báo path 
let index = './sources/index.html';

let content_main = './sources/content_main.html';
let content_sub_1 = './sources/content_sub_1.html';
let content_sub_2 = './sources/content_sub_2.html';

let buffer = './sources/buffer.html';
let build_index = './build/index.html';



let build_content_main_from_sub_1 = new Templator(content_main).processFile(content_sub_1);
fs.writeFileSync(buffer, build_content_main_from_sub_1);

let build_content_main_from_sub_2 = new Templator(buffer).processFile(content_sub_2);
fs.writeFileSync(buffer, build_content_main_from_sub_2);

// console.log(build_content_main);

let build_index_from_buffer = new Templator(index).processFile(buffer);
fs.writeFileSync(build_index, build_index_from_buffer);


