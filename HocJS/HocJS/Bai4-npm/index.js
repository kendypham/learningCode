var readlineSync = require('readline-sync');

var pets = [];

var pet = readlineSync.question('Your pet ?');
pets.push(pet);

console.log(pets);