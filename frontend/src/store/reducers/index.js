import sportsReducer from "./sportsReducer";
import matchesReducer from './matchesReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    sportsReducer,
    matchesReducer,
});

export default rootReducer;