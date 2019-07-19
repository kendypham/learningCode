import React from 'react';
import { connect } from "react-redux";
import {logIn, register} from "./actions/LoggingAction"
import {browserHistory} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogIn from "./components/LogIn"
import Register from './components/Register';
class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Router  >
           <div>
                    
                        <Route path="/login" exact render={
                            () =>
                                <LogIn
                                    status={this.props.status}
                                    logIn={(user) => this.props.logIn(user)} />
                        } />

                        <Route path="/register" exact render={
                            () =>
                                <Register
                                    status={this.props.status}
                                    register={(user) =>  this.props.register(user) }
                                />
                        } />
                   
                </div>
      </Router>
    )
  }
}

const mapStateToProps = (centralState) => {
  return {
    user : centralState.user
  }
}

const mapDispatchToProps = dispatch => ({
  //Logging
  logIn: (user) => dispatch(logIn(user)),
  register: (user) => dispatch(register(user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
