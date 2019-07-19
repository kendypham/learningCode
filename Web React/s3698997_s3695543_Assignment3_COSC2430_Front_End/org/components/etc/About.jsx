import React, { Component } from 'react'
import Navigation from '../etc/Navigation.jsx'

export default class About extends Component {
    render() {
        return (
            <div className="about" >
                <Navigation />
                <h1 className="about-h1">Welcome!</h1>
            </div>
        )
    }
}
