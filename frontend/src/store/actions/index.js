export const setSports = (data) => {
    return {
        type: 'SET_SPORTS',
        payload: data
    }
}

export const setMatches = (data) => {
    return {
        type: 'SET_MATCHES',
        payload: data
    }
}

export const setCurrentSport = (data) => {
    return {
        type: 'SET_CURRENT_SPORT',
        payload: data
    }
}