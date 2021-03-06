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

export const setAlert = (data) => {
    return {
        type: 'SET_ALERT',
        payload: data
    }
}

export const resetAlert = () => {
    return {
        type: 'RESET_ALERT'
    }
}

export const setLogin = () => {
    return {
        type: 'LOGIN'
    }
}

export const setLogout = () => {
    return {
        type: 'LOGOUT'
    }
}


export const setPlayerData = (data) => {
    return {
        type: 'SET_PLAYER_DETAIL',
        payload: data
    }
}

export const resetPlayerData = () => {
    return {
        type: 'RESET_PLAYER_DETAIL'
    }
}