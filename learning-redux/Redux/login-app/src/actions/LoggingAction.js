export function register(user){
    return function(dispatch){
        fetch(`http://localhost:8080/register`, {
            headers : {
                "Accept" : "application/json, text/plain, */*",
                "Content-Type" : "application/json"  
            },
            method : "POST",
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.registration === "successful"){
                dispatch({
                    type : "REGISTER",
                    payload : data
                })
            }
            else {
                dispatch({
                    type : "INVALID"
                })
            }
        })
    }
}

export function logIn(user){
    return function(dispatch){
        fetch(`http://localhost:8080/login`, {
            headers : {
                "Accept" : "application/json, text/plain, */*",
                "Content-Type" : "application/json"  
            },
            method : "POST",
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.authorize === "true"){
                dispatch({
                    type : "LOG_IN",
                    payload : data
                })
            }
            else {
                dispatch({
                    type : "INVALID"
                })
            }
        })
    }
}