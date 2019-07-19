var Mouse = require('./Mouse');
var Cat = require('./Cat');

var m1 = new Mouse('white');
var m2 = new Mouse('black');
var cat = new Cat();
cat.eat(m1);
cat.eat(m2);
console.log(cat);
