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