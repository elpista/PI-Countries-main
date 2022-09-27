
export function getCountries () {

    return function (dispatch) {
        fetch('http://localhost:3001/countries')
        .then (data => data.json())
        .then (d => dispatch ({
            type: 'GET_COUNTRIES',
            payload: d
        }))
    }

}

export function searchCountry (search) {

    return function (dispatch) {
        fetch(`http://localhost:3001/countries?name=${search}`)
        .then(data => data.json())
        .then(d => dispatch({
            type: 'SEARCH_COUNTRY',
            payload: d
        }))
    }

}

export function infoCountry (id) {

    return function (dispatch) {
        fetch(`http://localhost:3001/countries/${id}`)
        .then (data => data.json())
        .then (d => dispatch ({
            type: 'INFO_COUNTRY',
            payload: d
        }))
    }

}

export function createActivity (activity) {

    console.log('lo que llega a las actions:', activity)

    return function (dispatch){
        fetch('http://localhost:3001/activities', {
        method: "POST",
        body: JSON.stringify(activity),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then (data => data.json())
    .then (d => dispatch ({
        type: 'CREATE_ACTIVITY',
        payload: d
    }))}
        
}
