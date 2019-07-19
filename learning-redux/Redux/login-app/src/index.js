import React from 'react'
import ReactDOM from 'react-dom'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';
import status from "./reducers/LoggingReducer"

var centralState = combineReducers({
    status : status
});

var store = createStore(centralState,composeWithDevTools(applyMiddleware(thunk)) )
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
