import card from "./reducers/CardReducer";
import user from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { createStore, combineReducers, applyMiddleware } from "redux";

const appReducer = combineReducers({
    card, user
})


const store = createStore(appReducer, composeWithDevTools(
    applyMiddleware(logger),
))

export default store