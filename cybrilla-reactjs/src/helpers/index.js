import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducer";
import thunk from 'redux-thunk';
import { api } from "service/api";

export const store = createStore(reducers, applyMiddleware(thunk.withExtraArgument({ api })));

export const history = require("history").createBrowserHistory()
