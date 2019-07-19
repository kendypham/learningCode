var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello World!';

// document.querySelector('html').onclick = function(){
//     alert('Hello');
// }

// var myHTML = document.querySelector('html');
// myHTML.onclick = function(){
//     alert('test');
// };

var myImg = document.querySelector('img');

myImg.onclick = function(){
    var mySrc = myImg.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png'){
        myImg.setAttribute('src', 'images/gg-icon.png');
    }else{
        myImg.setAttribute('src', 'images/firefox-icon.png');
    }
};

var myBtn = document.querySelector('button');

function setUserName(){
    var myName = prompt('Please enter your name.');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Hello ' + myName;
}

if(!localStorage.getItem('name')){
    console.log('chay vao day');
    setUserName();
}else{
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Hello ' + storedName;
}

myBtn.onclick = function(){
    setUserName();
};