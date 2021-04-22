# template-html
_copy from : https://github.com/grit96/template-html_

Generate static HTML files from templates and content files. gulp-template-html is a Gulp plugin for this with example usage.

## Installation
```sh
$ npm install -g template-html
```

## Help

```sh
Usage: template-html content.html -t template.html [options]

-h|--help      display this help message
-v|--version   display the version number
-o|--output    directory to output processed HTML
-t|--template  template file to use
--tag          keyword to use be used in HTML placeholder define and build comments
--build-tag    keyword to use be used in HTML placeholder build comments (overrides --tag)
--define-tag   keyword to use be used in HTML placeholder define comments (overrides --tag)
--preserve-tree  output files will keep the same directory structure as the source files
```


## Sample usage

For the most basic use case of this plugin, create a template file with