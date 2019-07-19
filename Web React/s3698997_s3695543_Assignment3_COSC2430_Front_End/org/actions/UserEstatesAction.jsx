export function fetchUsersAds(username) {
    return function (dispatch) {
        fetch(`http://128.199.136.80:3000/estates/byUser/${username}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_USER_ADS',
                    payload: data
                })
            })
    }
}

export function addAdvert(ad) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/estates/byUser`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: ad.id,
                title: ad.title,
                price: parseInt(ad.price),
                area: parseInt(ad.area),
                bedrooms: parseInt(ad.bedrooms),
                floors: parseInt(ad.floors),
                direction: ad.direction,
                contactInfo: ad.contactInfo,
                address: ad.address,
                postDate: ad.postDate,
                expiredDate: ad.expiredDate,
                imageUrl: ad.imageUrl,
                project: ad.project,
                user: ad.user
            })
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'ADD_ADVERT',
                    payload: data
                })
            })
    }
}

export function deleteAdvert(_id) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/estates/${_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
            .then((res) => { return JSON.stringify(res) })
            .then(dispatch({
                type: 'DELETE_ADVERT',
                payload: _id
            }))

    }
}

export function updateAdvert(ad) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/estates/`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(ad)
        })
            .then((res) => { dispatch(fetchUsersAds(sessionStorage.getItem('state'))) })
    }
}

export function getAdvert(_id) {
    return (dispatch) => {
        fetch(`http://128.199.136.80:3000/estates/${_id}`, {
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'GET_ADVERT',
                    payload: data
                })
            })
    }
}
