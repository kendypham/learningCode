const editProject = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_PROJECT':
            return action.payload
        default:
            return state
    }
}

export default editProject;