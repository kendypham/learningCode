var fs = require('fs');
//sync
// console.log('Start');
// var song1 = fs.readFileSync('./song1.txt', { encoding : 'utf8' });
// console.log(song1);
// var song2 = fs.readFileSync('./song2.txt', { encoding : 'utf8' });
// console.log(song2);
// console.log('End');

//Async
console.log('Start');
fs.readFile('./song1.txt', { encoding : 'utf8' }, function(err, data){
    console.log(data);
});
fs.readFile('./song2.txt', { encoding : 'utf8' }, function(err, data){
    console.log(data);
});
console.log('End');