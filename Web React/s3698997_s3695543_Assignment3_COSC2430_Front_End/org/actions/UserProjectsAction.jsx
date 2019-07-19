export function fetchUsersProjects(username) {
    return function (dispatch) {
        fetch(`http://128.199.136.80:3000/projects/byUser/${username}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_USER_PROJECTS',
                    payload: data
                })
            })
    }
}

export function addProject(project) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/projects/byUser`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: parseInt(project.id),
                name: project.name,
                owner: project.owner,
                type: project.type,
                totalArea: parseInt(project.totalArea),
                endYear: parseInt(project.endYear),
                user: project.user
            })
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'ADD_PROJECT',
                    payload: data
                })
            })
    }
}

export function deleteProject(_id) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/projects/${_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
            .then((res) => { return JSON.stringify(res) })
            .then(dispatch({
                type: 'DELETE_PROJECT',
                payload: _id
            }))

    }
}

export function updateProject(project) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/projects/`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(project)
        })
            .then((res) => { dispatch(fetchUsersProjects(sessionStorage.getItem('state'))) })
    }
}

export function getProject(_id) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/projects/${_id}`, {
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'EDIT_PROJECT',
                    payload: data
                })
            })
    }
}
