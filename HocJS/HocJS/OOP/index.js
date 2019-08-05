//Link https://www.youtube.com/watch?v=DpFDj-6iYoY&list=PL7pEw9n3GkoVYU-ZKBrDnxIiiUn0YP-uO&index=8

//create object
var a = new Object();
a.name = 'Truong';
a.age = 18;
a.playGame = true;
a.sayHello = function(){
    return `Hello ${this.name}`;
}
console.log(a);
console.log(a.sayHello());
//Another way to create object
//Singleton
var b = {
    name : 'Kendy',
    age : 18,
    playGame : true,
    sayHello : function(){
        return `Hello ${this.name}`;
    }
}

console.log(b);
console.log(b.sayHello());

//delete property froom object
delete(a.age);
console.log(a);


//Function object

var pizza = function(){
    this.crust = 'thin';
    this.toppings = 3;
}

var PizzaA = new pizza();
var PizzaB = new pizza();

//Private property
var book = function(){
    this.name = 'Doremon'; //public variable
    var price = 1000;      //private variable
    var getPrice = function(){
        return price;
    }

    //get private property
    var tmp = {};
    tmp.getPrice = getPrice;
    return tmp;
}

var bookA = new book();
console.dir(bookA);