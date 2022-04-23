const currentSportReducer = (state="cricket", action) => {
    switch (action.type) {
        case 'SET_CURRENT_SPORT':
            return action.payload
    
        default:
            return state
    }
}

export default currentSportReducer;