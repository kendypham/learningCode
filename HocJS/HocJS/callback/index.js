var sayHello = function(name){
    console.log(`Hello ${name}`);
}

var x = function(callback){
    var name = 'Truong';
    callback(name);
}

x(sayHello);