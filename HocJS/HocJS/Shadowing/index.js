var g = 'global'

var a = function() {
    var g = 'redefined global';
}

a();
console.log(g);
