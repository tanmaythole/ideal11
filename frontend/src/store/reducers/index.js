import sportsReducer from "./sportsReducer";
import matchesReducer from './matchesReducer';
import currentSportReducer from './currentSportReducer';
import alertReducer from './alertReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    sportsReducer,
    matchesReducer,
    currentSportReducer,
    alertReducer
});

export default rootReducer;