const userAdverts = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ADVERT':
            return [...state, action.payload];
        case 'DELETE_ADVERT':
            return state.filter((res) => res._id !== action.payload);
        case 'FETCH_USER_ADS':
            state = action.payload;
        default:
            return state;
    }
}

export default userAdverts;