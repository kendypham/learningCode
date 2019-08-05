var str = "Hello";
console.log([...str]);

console.log(Array.from(str));

const test = Array.from({length : 5}, (v, i) => {return i*i})
console.log(test);

const test1 = (new Array(5) ).fill(0).map((v,i) => {
    return i
});
console.log(test1);


const number = [1,1,2]
console.log([...new Set(number)]);
console.log(Array.from(new Set(number)));

const sayHello = function(){
    console.log(Array.from(arguments).join(''));
    
}
sayHello('H','E','L','L','O')