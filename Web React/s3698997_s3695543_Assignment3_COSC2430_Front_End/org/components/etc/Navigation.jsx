import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        sessionStorage.clear()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <li className="navbar-brand">
                        <NavLink to="/home" style={{ textDecoration: "none", color: "black", }}><i className="fas fa-home" style={{ fontSize: "30px" }} ></i> &nbsp; <b style={{ fontSize: "30px" }}>Whiz Estates</b> &nbsp; </NavLink>
                    </li>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-link" style={{ marginTop: "1.8%" }}>
                                <NavLink to="/home" style={{ textDecoration: "none", color: "black", }}><b>Home</b></NavLink>
                            </li>
                            &nbsp;
                            &nbsp;
                            <li className="nav-link" style={{ marginTop: "1.8%" }}>
                                <NavLink to="/userestates" style={{ textDecoration: "none", color: "black", }}><b>Estates</b></NavLink>
                            </li>
                            &nbsp;
                            &nbsp;
                            <li className="nav-link" style={{ marginTop: "1.8%" }}>
                                <NavLink to="/userprojects" style={{ textDecoration: "none", color: "black", }}><b>Projects</b></NavLink>
                            </li>
                            &nbsp;
                            &nbsp;
                            <li className="nav-link" style={{ marginTop: "1.8%" }}>
                                <NavLink to="/about" style={{ textDecoration: "none", color: "black", }}><b>About</b></NavLink>
                            </li>
                        </ul>
                        <div className='form-inline mt-2 mt-md-0'>
                            {sessionStorage.getItem('state') ?
                                <div>
                                    <code style={{ color: "grey" }}>Logged in as {sessionStorage.getItem('state')}</code> &nbsp;
                                    <NavLink style={{ textDecoration: "none", color: "white" }} to="/home"><button className="btn btn-nav-signout" onClick={this.signOut} >Sign Out</button></NavLink>
                                    
                                </div>
                                : <div>
                                    <NavLink style={{ textDecoration: "none", color: "white" }} to="/signin"><button className="btn btn-nav-signin" >Sign In</button></NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
