import React from 'react';
import { connect } from 'react-redux';

import {browserHistory} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import GeneralView from './org/components/global/GeneralView.jsx';
import { fetchAllAds } from './org/actions/GlobalAction.jsx'
import { fetchAllProjects } from './org/actions/GlobalAction.jsx'

//LoggingPages && LoggingActions
import SignIn from './org/components/logging/SignIn.jsx';
import Register from './org/components/logging/Register.jsx';
import { logIn, register } from './org/actions/LoggingAction.jsx';

//EstatesPages && EstatesActions
import UserEstates from './org/components/ads/UserEstates.jsx';
import { addAdvert, fetchUsersAds, getAdvert, updateAdvert, deleteAdvert } from './org/actions/UserEstatesAction.jsx';

//ProjectPage && ProjectActions
import UserProjects from './org/components/projects/UserProjects.jsx';
import { addProject, fetchUsersProjects, getProject, updateProject, deleteProject } from './org/actions/UserProjectsAction.jsx'

//PageNotFound Handling
import PageNotFound from './org/components/etc/PageNotFound.jsx';
import About from './org/components/etc/About.jsx'

//Filtering
import {getFilteredEstates} from './org/actions/EstateFilterAction.jsx'

//css
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <Router history = {browserHistory} >
                <div>
                    <Switch>
                        <Route path="/" exact render={
                            () => <GeneralView
                                getFilteredEstates={(filter) => this.props.getFilteredEstates(filter)}
                                filteredEstates = {this.props.filteredEstates}
                                
                                editAdvert={this.props.editAdvert}
                                getAdvert={(_id) => this.props.getAdvert(_id)}
                                projects={this.props.projects}
                                adverts={this.props.adverts}
                                fetchAllAds={this.props.fetchAllAds}
                                fetchAllProjects={this.props.fetchAllProjects}
                            />
                        }
                        />

                        <Route path="/home" exact render={
                            () =>
                                <GeneralView
                                getFilteredEstates={(filter) => this.props.getFilteredEstates(filter)}
                                filteredEstates = {this.props.filteredEstates}

                                editAdvert={this.props.editAdvert}
                                getAdvert={(_id) => this.props.getAdvert(_id)}
                                projects={this.props.projects}
                                adverts={this.props.adverts}
                                fetchAllAds={this.props.fetchAllAds}
                                fetchAllProjects={this.props.fetchAllProjects}
                                />
                        } />

                        <Route path="/signin" exact render={
                            () =>
                                <SignIn
                                    status={this.props.status}
                                    logIn={(cred) => this.props.logIn(cred)} />
                        } />

                        <Route path="/register" exact render={
                            () =>
                                <Register
                                    status={this.props.status}
                                    register={(cred) =>  this.props.register(cred) }
                                />
                        } />

                        <Route path="/userestates" exact render={
                            () =>
                                <UserEstates
                                    editAdvert={this.props.editAdvert}
                                    addAdvert={(ad) => this.props.addAdvert(ad)}
                                    fetchUsersAds={(username) => this.props.fetchUsersAds(username)}
                                    getAdvert={(_id) => this.props.getAdvert(_id)}
                                    updateAdvert={(ad) => this.props.updateAdvert(ad)}
                                    deleteAdvert={(_id) =>  this.props.deleteAdvert(_id) }
                                    userAdverts={this.props.userAdverts}

                                    fetchUsersProjects={(username) => this.props.fetchUsersProjects(username)}
                                    fetchAllProjects={this.props.fetchAllProjects}                                    
                                    projects={this.props.projects}
                                    userProjects={this.props.userProjects}
                                />
                        } />

                        <Route path="/userprojects" exact render={
                            () =>
                                <UserProjects
                                    editProject={this.props.editProject}
                                    addProject={(project) => this.props.addProject(project)}
                                    fetchUsersProjects={(username) => this.props.fetchUsersProjects(username)}
                                    getProject={(_id) => this.props.getProject(_id)}
                                    updateProject={(project) => this.props.updateProject(project)}
                                    deleteProject={(_id) =>  this.props.deleteProject(_id) }
                                    userProjects={this.props.userProjects}
                                />
                        } />

                        <Route path="/about" exact component={About} />

                        <Route component={PageNotFound} />

                    </Switch>

                </div>

            </Router>
        )
    }

}

const mapStateToProps = (centralState) => {
    return {
        adverts: centralState.adverts,
        userAdverts: centralState.userAdverts,
        editAdvert: centralState.editAdvert,

        projects: centralState.projects,
        userProjects: centralState.userProjects,
        editProject: centralState.editProject,

        status: centralState.status,
        filteredEstates: centralState.filteredEstates

    }
}

const mapDispatchToProps = dispatch => ({
    //FetchAll
    fetchAllAds: () => dispatch(fetchAllAds()),
    fetchAllProjects: () => dispatch(fetchAllProjects()),

    //Adverts
    addAdvert: (ad) => dispatch(addAdvert(ad)),
    fetchUsersAds: (username) => dispatch(fetchUsersAds(username)),
    getAdvert: (_id) => dispatch(getAdvert(_id)),
    updateAdvert: (ad) => dispatch(updateAdvert(ad)),
    deleteAdvert: (_id) => dispatch(deleteAdvert(_id)),

    //Projects
    addProject: (project) => dispatch(addProject(project)),
    fetchUsersProjects: (username) => dispatch(fetchUsersProjects(username)),
    getProject: (_id) => dispatch(getProject(_id)),
    updateProject: (ad) => dispatch(updateProject(ad)),
    deleteProject: (_id) => dispatch(deleteProject(_id)),

    //Logging
    logIn: (cred) => dispatch(logIn(cred)),
    register: (cred) => dispatch(register(cred)),

    //Filtering
    getFilteredEstates:(filter) => dispatch(getFilteredEstates(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)