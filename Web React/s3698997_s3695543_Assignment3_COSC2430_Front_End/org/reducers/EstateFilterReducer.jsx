const filteredEstates = (state = [], action) => {
    switch (action.type) {
        case 'FILTER_ESTATE':
            return state=action.payload
        default:
            return state
    }
}

export default filteredEstates;