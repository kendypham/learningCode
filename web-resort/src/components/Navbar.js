import React, { Component } from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'
export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen : false
        }
    }

    handleToogle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="nav-center">
                        <div className="nav-header">
                            <Link to="/">
                                <img src={logo} alt="logo"/>
                            </Link>
                            <button type="button" onClick={this.handleToogle} className="nav-btn">
                                <FaAlignRight className="nav-icon"/>
                            </button>
                        </div>
                        <ul className={this.state.isOpen?"nav-links show-nav" : "nav-links"}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/rooms">Rooms</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
