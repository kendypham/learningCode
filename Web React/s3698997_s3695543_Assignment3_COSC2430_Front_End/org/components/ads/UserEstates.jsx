import React, { Component } from 'react'
import EstateForm from './EstateForm.jsx'
import Navigation from '../etc/Navigation.jsx'
import { Link } from 'react-router-dom'

export default class UserEstates extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.fetchUsersAds(sessionStorage.getItem('state'))
        this.props.fetchAllProjects()
    }

    handleEdit(_id) {
        this.props.getAdvert(_id)
    }

    render() {
        if (sessionStorage.getItem('state') === null || sessionStorage.getItem('state') === undefined) {
            return (
                <div className="need-signin" align="center">
                    <h1>It appears that you haven't signed in yet. <p></p> Please click <Link to="/signin">here</Link> to sign in.</h1>
                    <Link to="/home" >
                        <button type="button" className="btn btn-home">
                            <i className="fas fa-home"></i>
                        </button>
                    </Link>
                </div>
            )
        }

        else {
            return (
                <div>
                    <Navigation />
                    <br />

                    <button onClick={() => { this.EstateForm.clearForm() }} type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-plus"></i>
                    </button>

                    <div className="row">
                        <div className="modal fade bd-example-modal-lg col-sm-12" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Estate Form</h5>
                                        <button onClick={() => { this.EstateForm.clearForm() }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <EstateForm
                                            ref={instance => { this.EstateForm = instance }}
                                            editAdvert={this.props.editAdvert}
                                            addAdvert={(ad) => this.props.addAdvert(ad)}
                                            updateAdvert={(ad) => this.props.updateAdvert(ad)}
                                            projects={this.props.projects}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {this.props.userAdverts.map((ad, index) =>
                            <div className="col-sm-3" key={index} >
                                <div className="card border-lightgrey mb-3 text-center">
                                    <img className="card-img-top" style={{maxHeight:"393px", maxWidth:"675px", height:"393px"}} src={ad.imageUrl} alt="" />
                                    <div className="card-body">
                                        <div>
                                            <h5 className="card-title">{ad.title}</h5>
                                            <p className="card-text" >
                                                <b>ID:</b> {ad.id}<br />
                                                {/* <b>Title:</b> {ad.title}<br /> */}
                                                <b>Price: </b> ${ad.price}<br />
                                                <b>Area:</b> {ad.area}<br />
                                                <b>Number of bedrooms: </b>{ad.bedrooms}<br />
                                                <b>Number of floors: </b>{ad.floors}<br />
                                                <b>Direction: </b>{ad.direction}<br />
                                            </p>
                                            <div>
                                                <a role="button" data-toggle="modal" style={{ color: "dark" }} data-target="#exampleModal" className="btn btn-warning" onClick={() => this.handleEdit(ad._id)}>
                                                    <i className="fas fa-edit"></i>
                                                </a>
                                                &nbsp;
                                                &nbsp;
                                                <a role="button" className="btn btn-danger" style={{ color: "white" }} onClick={(_id) => this.props.deleteAdvert(ad._id)}><i className="fas fa-trash-alt"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    }
}
