var path = require('path');
var fs = require('fs');
var path = require('path');
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

    this.BuildTags = null;
    this.NameBuildTags = null;
    this.JsonDirTree = null;
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

Templator.prototype.processCheckBuildTag = function () {

    let buildTag = this.options.buildTag;
    let regMark = new RegExp('<!--\\s*' + buildTag + ':([^\\s]+)\\s*-->', 'g');
    let regMark1 = new RegExp('<!--\\s*' + buildTag + ':([\\w\-]+)\\s*-->', '');

    // lấy tất cả các TAG trong file theo key build
    let tags = this.template.match(regMark);
    // console.log(tags);

    this.BuildTags = tags;
    return this;
}

Templator.prototype.processCheckNameBuildTag = function () {
    // let buildTag = this.options.buildTag;
    // let regMark1 = new RegExp('<!--\\s*' + buildTag + ':([\\w\-]+)\\s*-->', '');

    let buildTags = this.BuildTags;

    //viết hàm cắt chuỗi lấy tên sau từ khóa build
    function cutNameTag(str) {
        if (typeof str === 'string') {
            let name;
            name = str.slice(11, -4);
            return name.replace(/\s/g, '');
        } else {
            return 'error';
        }
    };

    // lấy đc tên tag sau từ khóa build 
    // viết vòng for lặp lại tất cả các phần tử trong mảng
    let namesTags = new Array();
    for (i = 0; i < buildTags.length; i++) {
        namesTags[i] = cutNameTag(buildTags[i]);
    };

    this.NameBuildTags = namesTags;
    return this;
}

Templator.prototype.processDirTree = function (filename) {
    let stats = fs.lstatSync(filename);

    let info = {
        path: filename,
        name: path.basename(filename)
    };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function (child) {
            return Templator.prototype.processDirTree(filename + '/' + child);
        });
    } else {
        info.type = "file";
    }

    return info;
};

module.exports = Templator;
