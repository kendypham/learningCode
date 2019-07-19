import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import adverts from './org/reducers/GlobalAdsReducer.jsx'
import userAdverts from './org/reducers/UserAdvertsReducer.jsx'
import editAdvert from './org/reducers/EditAdvertReducer.jsx'

import projects from './org/reducers/GlobalProjectsReducer.jsx'
import userProjects from './org/reducers/UserProjectsReducer.jsx'
import editProject from './org/reducers/EditProjectReducer.jsx'

import status from './org/reducers/LoggingReducer.jsx'

import filteredEstates from './org/reducers/EstateFilterReducer.jsx'

var centralState = combineReducers({
    //Advertisements 
    adverts: adverts,
    userAdverts: userAdverts,
    editAdvert: editAdvert,

    //Projects
    projects: projects,
    userProjects: userProjects,
    editProject: editProject,

    //Logging
    status: status,

    //Filtering
    filteredEstates: filteredEstates

})

var store = createStore(centralState, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'))