const adverts = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_ADS':
            state = action.payload;
            return state
        
        default:
            return state
    }
}

export default adverts;