// var fs = require ('promise-fs');

// function onDone(song){
//     console.log(song);
// }

// function onErr(err){
//     console.log(err);
// }

// fs.readFile('./song1.txt', { encoding : 'utf8' })
//     .then(onDone)
//     .then(function(){
//         return fs.readFile('./song2.txt', { encoding : 'utf8' }) //phai tra ve 1 promise neu khong se undefined
//     })
//     .then(onDone)
//     .catch(onErr);


//su dung Promise
var fs = require ('fs');

function readFilePromise(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, {encoding : 'utf8'}, function(err, data){
            if(err)
                reject(err);
            else
                resolve(data);
        });
    });
}

// readFilePromise('./song1.txt')
//     .then(function(song1){
//         console.log(song1);
//     })
//     .then(function(){
//        return readFilePromise('./song2.txt');
//     })
//     .then(function(song1){
//         console.log(song1);
//     })
//     .catch(function(err){
//         console.log(err);
//     })

//su dung promise.all truyen vo la mot mang
Promise.all([
    readFilePromise('./song1.txt'),
    readFilePromise('./song2.txt') //chi chay khi tat ca resolve
]).then(function(values){
    console.log(values);
}).catch(function(err){
    console.log(err);
});