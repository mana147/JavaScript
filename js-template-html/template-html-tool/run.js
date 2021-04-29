var fs = require('fs'),
    path = require('path'),
    Templator = require('./index');

var template1 = new Templator('./examples/partial-template/sources/index.html');
var template2 = new Templator('./examples/partial-template/sources/template.html');

var output1 = template1.processFile('./examples/partial-template/sources/content.html');
var output2 = template2.processContent(output1);

fs.writeFileSync('./build/content.html', output2);