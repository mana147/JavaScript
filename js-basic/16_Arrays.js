/*
Arrays

In contrast to variables, an array can store multiple values. 
Each value in an array has an index, and each index has a reference in a memory address. 
Each value can be accessed by using their indexes. 
The index of an array starts from zero, and the index of the last element is less by one from the length of the array.
An array is a collection of different data types which are ordered and changeable(modifiable). 
An array allows storing duplicate elements and different data types. 
An array can be empty, or it may have different data type values.

*/

console.log('--------------------------------------------');
// How to create an empty array
// syntax
const arr = Array();
// or
// let arr = new Array()
console.log(arr); // []

console.log('--------------------------------------------');
// syntax
// This the most recommended way to create an empty list
const arr_1 = [];
console.log(arr);


/*
How to create an array with values
Array with initial values. We use length property to find the length of an array.
*/
console.log('--------------------------------------------');

const numbers = [0, 3.14, 9.81, 37, 98.6, 100] // array of numbers
const fruits = ['banana', 'orange', 'mango', 'lemon'] // array of strings, fruits
const vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot'] // array of strings, vegetables
const animalProducts = ['milk', 'meat', 'butter', 'yoghurt'] // array of strings, products
const webTechs = ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node', 'MongDB'] // array of web technologies
const countries = ['Finland', 'Denmark', 'Sweden', 'Norway', 'Iceland'] // array of strings, countries

// Print the array and its length

console.log('Numbers:', numbers)
console.log('Number of numbers:', numbers.length)

console.log('Fruits:', fruits)
console.log('Number of fruits:', fruits.length)

console.log('Vegetables:', vegetables)
console.log('Number of vegetables:', vegetables.length)

console.log('Animal products:', animalProducts)
console.log('Number of animal products:', animalProducts.length)

console.log('Web technologies:', webTechs)
console.log('Number of web technologies:', webTechs.length)

console.log('Countries:', countries)
console.log('Number of countries:', countries.length)

console.log('--------------------------------------------');

// Array can have items of different data types

const arr_2 = [
    'Asabeneh',
    250,
    true,
    { country: 'Finland', city: 'Helsinki' },
    { skills: ['HTML', 'CSS', 'JS', 'React', 'Python'] },
] // arr containing different data types
console.log(arr_2)


// Creating an array using split 

console.log('--------------------------------------------');

let js = 'JavaScript'
const charsInJavaScript = js.split('')

console.log(charsInJavaScript) // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

let companiesString = 'Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon'
const companies = companiesString.split(',')

console.log(companies) // ["Facebook", " Google", " Microsoft", " Apple", " IBM", " Oracle", " Amazon"]
let txt = 'I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.'
const words = txt.split(' ')

console.log(words)
// the text has special characters think how you can just get only the words
// ["I", "love", "teaching", "and", "empowering", "people.", "I", "teach", "HTML,", "CSS,", "JS,", "React,", "Python"]

console.log('--------------------------------------------');

// Accessing array items using index
// We access each element in an array using their index. An array index starts from 0.

const fruits_ = ['banana', 'orange', 'mango', 'lemon']
let firstFruit = fruits_[0] // we are accessing the first item using its index

console.log(firstFruit) // banana

secondFruit = fruits_[1]
console.log(secondFruit) // orange

let lastFruit = fruits_[3]
console.log(lastFruit) // lemon
// Last index can be calculated as follows

let lastIndex = fruits_.length - 1
lastFruit = fruits_[lastIndex]

console.log(lastFruit) // lemon

console.log('--------------------------------------------');


const number = [0, 3.14, 9.81, 37, 98.6, 100] // set of numbers

console.log(number.length) // => to know the size of the array, which is 6
console.log(number) // -> [0, 3.14, 9.81, 37, 98.6, 100]
console.log(number[0]) //  -> 0
console.log(number[5]) //  -> 100

let lastindex = number.length - 1
console.log(number[lastindex]) // -> 100

console.log('--------------------------------------------');

const webTechsNew = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Redux',
    'Node',
    'MongoDB',
] // List of web technologies

console.log(webTechsNew) // all the array items
console.log(webTechsNew.length) // => to know the size of the array, which is 7
console.log(webTechsNew[0]) //  -> HTML
console.log(webTechsNew[6]) //  -> MongoDB

let lastIndex_webTechsNew = webTechsNew.length - 1
console.log(webTechsNew[lastIndex_webTechsNew]) // -> MongoDB

console.log('--------------------------------------------');


// Modifying array element

const numbersnew = [1, 2, 3, 4, 5]
numbersnew[0] = 10 // changing 1 at index 0 to 10
numbersnew[1] = 20 // changing  2 at index 1 to 20

console.log(numbersnew) // [10, 20, 3, 4, 5]

const countriesnew = [
    'Albania',
    'Bolivia',
    'Canada',
    'Denmark',
    'Ethiopia',
    'Finland',
    'Germany',
    'Hungary',
    'Ireland',
    'Japan',
    'Kenya',
]

countriesnew[0] = 'Afghanistan' // Replacing Albania by Afghanistan
let lastIndex_countriesnew = countriesnew.length - 1
countriesnew[lastIndex_countriesnew] = 'Korea' // Replacing Kenya by Korea

console.log(countriesnew);


console.log('--------------------------------------------');


/*
Methods to manipulate array
There are different methods to manipulate an array. 
These are some of the available methods to deal with arrays :
    Array, length, concat, indexOf, slice, splice, join, toString, includes, lastIndexOf, isArray, fill, push, pop, shift, unshift
*/

