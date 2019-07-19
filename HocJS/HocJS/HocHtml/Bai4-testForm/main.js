var form = document.getElementById('form');

form.addEventListener('submit', handleData);

function handleData(){
    var nameInput = document.getElementsByName('name');
    console.log(nameInput);
}