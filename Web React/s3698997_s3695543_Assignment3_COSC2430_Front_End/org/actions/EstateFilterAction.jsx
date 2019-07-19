export function getFilteredEstates(filter) {
    return dispatch => {
        fetch(`http://128.199.136.80:3000/estates/filter`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                minPrice: parseInt(filter.minPrice),
                maxPrice: parseInt(filter.maxPrice),
                minArea: parseInt(filter.minArea),
                maxArea: parseInt(filter.maxArea),
                minBedrooms: parseInt(filter.minBedrooms),
                maxBedrooms: parseInt(filter.maxBedrooms),
                minFloors: parseInt(filter.minFloors),
                maxFloors: parseInt(filter.maxFloors)
            })
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FILTER_ESTATE',
                    payload: data
                })
            })
    }
}