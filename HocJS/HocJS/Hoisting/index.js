var x = 'abc';
var a = function(){
    //Hoisting
    //var x;
    console.log(x)
    //x = test;
    var x = "test";
    console.log(x)
}

a();