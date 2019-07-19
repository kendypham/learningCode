const userProjects = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [...state, action.payload];
        case 'DELETE_PROJECT':
            return state.filter((res) => res._id !== action.payload);
        case 'FETCH_USER_PROJECTS':
            state = action.payload;
        default:
            return state;
    }
}

export default userProjects;