import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="error">
        <h1>404</h1>
        <h2>Page not found</h2>
        <br />
        <p>Either the page you are looking for doesn't exist or an error has occured</p>
        <p>Click <NavLink to="/home">here</NavLink> to go back to home.</p>
        <br /><br />
      </div>
    )
  }
}
