//Link https://www.youtube.com/watch?v=-xqJo5VRP4A&list=PL7pEw9n3GkoVYU-ZKBrDnxIiiUn0YP-uO&index=22
for(let i = 0; i < 3; i++){
    setTimeout(()=>{
        console.log(i);
    }, 1000);
}


for(var i = 0; i < 3; i++){
    setTimeout(()=>{
        console.log(i);
    }, 1000);
}

console.log("after the loop");