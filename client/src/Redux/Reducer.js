const initialState = {

    countries: [],
    copyCountries: [],
    country: [],
    activities: []
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                copyCountries: action.payload
            };
        case 'SEARCH_COUNTRY':
            return{
                ...state,
                countries: action.payload
            };
        case 'INFO_COUNTRY':
            return{
                ...state,
                country: action.payload
            };
        case 'CREATE_ACTIVITY':
            return{
                ...state,
                activities: state.activities.concat(action.payload)
            };
        default:
            return state
    }
}