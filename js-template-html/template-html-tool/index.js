var path = require('path');
var fs = require('fs');
var ul = require('ul');

/**
 * Creates a new `Templator` instance.
 * @name Templator
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `templateFile` (String): Path to template file to use
 *  - `tag` (String): Keyword to use be used in HTML placeholder comments
 *  - `buildTag` (String): Keyword to use be used in HTML placeholder build comments (overrides --tag)
 *  - `defineTag` (String): Keyword to use be used in HTML placeholder define comments (overrides --tag)
 */

var Templator = function (options) {
  if (typeof options === 'string') {
    options = {
      templateFile: options,
    };
  }

  // default tag
  options = ul.merge(options, {
    tag: 'build',
  });

  // default build tag and define tag
  options = ul.merge(options, {
    buildTag: options.tag,
    defineTag: options.tag,
  });

  if (typeof options.templateFile !== 'string') {
    throw new Error('No template file provided');
  }

  options.templateFile = path.resolve(options.templateFile);

  this.template = fs.readFileSync(options.templateFile).toString();
  this.options = options;
};

/**
 * Run the contents of an HTML file through the `Templator`
 * @name processFile
 * @function
 * @param {String} contentFile Path to HTML file to be processed
 * @return {String} The processed HTML
 */

Templator.prototype.processFile = function (contentFile) {
  return this.processContent(fs.readFileSync(contentFile).toString());
};

/**
 * Generate HTML from template file and content file
 * @name processContent
 * @function
 * @param {String} content HTML content to be used in template
 * @return {String} The processed HTML
 */

Templator.prototype.processContent = function (content) {
  var buildTag = this.options.buildTag;
  var defineTag = this.options.defineTag;
  var regMark = new RegExp('<!--\\s*' + buildTag + ':([^\\s]+)\\s*-->', 'g');

  function genRegex(name) {
    return new RegExp(
      '<!--\\s*' + defineTag + ':' + name + '\\s*-->' +
      '((.|[\\r\\n])+)' +
      '<!--\\s*\\/' + defineTag + ':' + name + '\\s*-->'
    );
  }

  return this.template.replace(regMark, function (match, name) {
    var find = content.match(genRegex(name));
    return find ? find[1] : match;
  });
};

/**
 * @name processCheckTag
 * @function
 * @param {String} Path to folder to be processed
 * @return 
 */

Templator.prototype.processCheckTag = function (Path) {
  let build_index = './build/index.html';

  let buildTag = this.options.buildTag;
  let regMark = new RegExp('<!--\\s*' + buildTag + ':([^\\s]+)\\s*-->', 'g');
  let regMark1 = new RegExp('<!--\\s*' + buildTag + ':([\\w\-]+)', '');

  // lấy tất cả các TAG trong file theo key build
  let tags = this.template.match(regMark);
  console.log(tags);
  //  luu tam vao build_index 
  fs.writeFileSync(build_index, tags);

  // trong các TAG đã lấy đc , cắt lấy tên và lưu vào 1 mảng 

  // lấy chiều dài của mảng
  let lengthTags = tags.length;
  console.log(lengthTags);

  tags.forEach(function (value) {
    let name = regMark1.exec(value);
    console.log(name);
  })

  // viết hàm cắt chuỗi lấy tên sau từ khóa build
  function cutNameTag(str) {
    if (typeof str === 'string') {
      let name;
      name = str.slice(11, -3);
      return name;
    } else {
      return 'error';
    }
  };

  // lấy đc tên tag sau từ khóa build 
  // viết vòng for lặp lại tất cả các phần tử trong mảng
  let namesTags = new Array();
  for (i = 0; i < tags.length; i++) {
    namesTags[i] = cutNameTag(tags[i]);
  };

  console.log(namesTags);
  fs.writeFileSync(build_index, namesTags);



  //  viết hàm xử lý directory  


  return '>>> done >>>';
}


module.exports = Templator;
