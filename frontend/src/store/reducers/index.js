import sportsReducer from "./sportsReducer";
import matchesReducer from './matchesReducer';
import currentSportReducer from './currentSportReducer';
import alertReducer from './alertReducer';
import loginReducer from "./loginReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    sportsReducer,
    matchesReducer,
    currentSportReducer,
    alertReducer,
    loginReducer
});

export default rootReducer;