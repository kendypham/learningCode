const projects = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_PROJECTS':
            state = action.payload;
            return state
        
        default:
            return state
    }
}

export default projects;