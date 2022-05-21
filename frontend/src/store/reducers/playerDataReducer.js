let initialState = {"show":false, "type":"", "playerData": {}}
const playerDataReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_PLAYER_DETAIL':
            return action.payload;
    
        case 'RESET_PLAYER_DETAIL':
            return initialState;
        
        default:
            return state;
    }
}

export default playerDataReducer;