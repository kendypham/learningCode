const editAdvert = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ADVERT':
            return action.payload
        default:
            return state
    }
}

export default editAdvert;