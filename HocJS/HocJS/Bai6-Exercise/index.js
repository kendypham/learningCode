var readlineSync = require('readline-sync');
var fs = require('fs');
var Student = require('./Student');
// var newStudent = {};


// while(true){
//     var menu = '\n1.Show data \n2.Create new \n3.Save & Exit\n';
//     console.log(menu);
//     var choose = readlineSync.question('Enter your choice ');

    
    
//     if(choose == 1){
//         var students = [];     
//         var resultString = fs.readFileSync('./data.json', {encoding : 'utf8'});
//         var resultObject = JSON.parse(resultString);   
//         console.log(resultObject);
//         for(var object of resultObject){
//             students.push(object);
//         }
//     }
//     else if(choose == 2){
//         var yourName = readlineSync.question('Enter your name : ');
//         var yourAge = readlineSync.question('Enter your age : ');
//         newStudent = new Student(yourName, yourAge);
//         students.push(newStudent);
//     }
//     else if(choose == 3){
//         let dataObject = JSON.stringify(students);
//         fs.writeFileSync('./data.json',dataObject);
//     }
//     else break;
// }

var students = [];

function showMenu(){
    console.log('1. Show all students');
    console.log('2. Create a new student');
    console.log('3. Save & Exit');
    var option = readlineSync.question('> ');
    switch (option) {
        case '1' : 
            showStudents();
            showMenu();
            break;
        case '2' :
            showCreateStudent();
            showMenu();
            break;
        case '3' : 
            saveAndExit();
            break;
        default : 
            console.log('Wrong option');
            showMenu();
            break;
    }
}

function loadData(){
    var fileContent = fs.readFileSync('./data.json');
    students = JSON.parse(fileContent);
}

function showStudents(){
    for( var student of students){
        console.log(student.name, student.age);
    }
}

function showCreateStudent(){
    var name = readlineSync.question('Enter your name : ');
    var age = readlineSync.question('Enter your age : ');
    var student = new Student(name, parseInt(age));
    students.push(student);
}

function saveAndExit(){
    var content = JSON.stringify(students);
    fs.writeFileSync('./data.json', content, {encoding : 'utf8'});
}

function main(){
    loadData();
    showMenu();
}

main();