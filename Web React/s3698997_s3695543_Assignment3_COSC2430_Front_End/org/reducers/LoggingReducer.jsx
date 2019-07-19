const status = (state = {"username":"","password":"", "registration":"", "authorization":""}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return state = {"username":action.payload.username, "password":action.payload.password}

        case 'REGISTER':
            return state = {"registration":action.payload.registration}

        case 'INVALID':
            return state = {"authorization":"false"}
        
        default:
            return state
    }
}

export default status;