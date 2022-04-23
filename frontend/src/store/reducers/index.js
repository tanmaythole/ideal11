import sportsReducer from "./sportsReducer";
import matchesReducer from './matchesReducer';
import currentSportReducer from './currentSportReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    sportsReducer,
    matchesReducer,
    currentSportReducer
});

export default rootReducer;