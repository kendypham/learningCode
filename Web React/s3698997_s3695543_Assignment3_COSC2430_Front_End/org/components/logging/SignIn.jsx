import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": "",
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status.authorization == "false") {
            alert("It appears that you username/password is wrong. Please try again.")
            this.setState({ username: "", password: "" })
            sessionStorage.clear()
        }
    }

    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    onSignIn(e) {
        e.preventDefault()
        this.props.logIn({ username: this.state.username, password: this.state.password })
    }


    render() {
        if (!sessionStorage.getItem('state')) {
            return (
                <div className="container signin-background" >
                    <div className="row">
                        <div className="col-sm-7"></div>
                        <div className="col-sm-5">
                            <div className="card sign-in">
                                <br />
                                <h4 className="card-header text-center signin-header" >Welcome</h4>
                                <h6 className="card-header text-center signin-header">Please Sign In to Continue </h6>

                                <div className="card-body">
                                    <form className="form-signin">
                                        <div className="form-group">
                                            <label htmlFor="">Username</label>
                                            <input className="form-control" name="username" value={this.state.username} onChange={this.handleChange.bind(this)} type="text" autoFocus />
                                            <label htmlFor="">Password</label>
                                            <input className="form-control" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} type="password" />
                                        </div>
                                        <button onClick={this.onSignIn} role="button" className="btn btn-sign-in">Sign In</button>
                                    </form>
                                </div>

                                <div className="card-footer">
                                    <h6>Don't have an account ? Click <Link to="/register">here</Link> to register</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/home" >
                        <button type="button" className="btn btn-home">
                            <i className="fas fa-home"></i>
                        </button>
                    </Link>
                </div>

            )
        }

        else {
            return (<Redirect to="/userestates" />)
        }
    }
}
