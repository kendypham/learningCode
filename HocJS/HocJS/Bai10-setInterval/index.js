function countFrom(a, b){
   return new Promise(function(resolve, reject){
        if(a > b)
            reject();
        else 
            {
                var setIntervalId = setInterval(function(){
                    console.log(a);
                    a++;
                    if(a > b){
                        clearInterval(setIntervalId);
                        resolve();
                    }
                }, 1000);
                
            }
   });
}

countFrom(1,10).then(function(){
    console.log('done');
}).catch(function(err){
    console.log(err);
})