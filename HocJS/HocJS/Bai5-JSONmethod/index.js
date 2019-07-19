//stringify - Convert an object to a JSON string
//parse - Covert a JSON string to an object
var dog = {name : 'Ki', age : 5, dead : false};
var dogString = JSON.stringify(dog);

console.log(typeof dog);
console.log(typeof dogString);

var catString = '{"name" : "Tom", "age" : 5}';
var cat = JSON.parse(catString);

console.log(cat);