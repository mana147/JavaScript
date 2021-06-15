# CommonJS module 

When Node.js was released in 2009, it would have been inconceivable for any runtime not to provide modules. CommonJS was adopted, which meant the Node package manager, npm, could be developed. Usage grew exponentially from that point.

## export :

A CommonJS module can be coded in a similar way to an ES2015 module. ```module.exports``` is used rather than ```export```:

```js
// lib.js
const PI = 3.1415926;

function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

function mult(...args) {
  log('mult', args);
  return args.reduce((num, tot) => tot * num);
}

// private function
function log(...msg) {
  console.log(...msg);
}

module.exports = { PI, sum, mult };
```

## require :

```require``` (rather than ```import```) is used to pull this module into another script or module:

```js
const { sum, mult } = require('./lib.js');

console.log( sum(1,2,3,4) );  // 10
console.log( mult(1,2,3,4) ); // 24
```
```require``` can also import all items:
```js
const lib = require('./lib.js');

console.log( lib.PI );            // 3.1415926
console.log( lib.add(1,2,3,4) );  // 10
console.log( lib.mult(1,2,3,4) ); // 24
```

# NOTE :

ES6 modules are behind a flag in Node.js 9.8.0+ and will not be fully implemented until at least version 10. While CommonJS and ES6 modules share similar syntax, they work in fundamentally different ways:

- ES6 modules are pre-parsed in order to resolve further imports before code is executed.
- CommonJS modules load dependencies on demand while executing the code.

It would make no difference in the example above, but consider the following ES2015 module code:

```js

// ES2015 modules

// ---------------------------------
// one.js
console.log('running one.js');
import { hello } from './two.js';
console.log(hello);

// ---------------------------------
// two.js
console.log('running two.js');
export const hello = 'Hello from two.js';

```
The output for ES2015:
```log
running two.js
running one.js
hello from two.js
```
Similar code written using CommonJS:

```js
// CommonJS modules

// ---------------------------------
// one.js
console.log('running one.js');
const hello = require('./two.js');
console.log(hello);

// ---------------------------------
// two.js
console.log('running two.js');
module.exports = 'Hello from two.js';
```
The output for CommonJS:
```js
running one.js
running two.js
hello from two.js
```

Execution order could be critical in some applications, and what would happen if ES2015 and CommonJS modules were mixed in the same file? To resolve this problem, Node.js will only permit ES6 modules in files with the extension .mjs. Files with a .js extension will default to CommonJS. It’s a simple option which removes much of the complexity and should aid code editors and linters.

> link : https://www.sitepoint.com/understanding-es6-modules/