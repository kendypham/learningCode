export function logIn(cred) {
    return function (dispatch) {
        fetch(`http://128.199.136.80:3000/login`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cred)
        })
            .then((res) => res.json())

            .then(data => {
                sessionStorage.setItem("state", cred.username)
                if (data.authorize === 'true') {
                    dispatch({ type: 'LOG_IN', payload: cred })
                }
                else {
                    dispatch({ type: 'INVALID'})
                }
            })
    }
}

export function register(cred) {
    return function (dispatch) {
        fetch(`http://128.199.136.80:3000/register`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cred)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.registration === 'successful') {
                    dispatch({ type: 'REGISTER', payload: data })
                }
                else {
                    dispatch({ type: 'REGISTER', payload: data })
                }
            })
    }
}