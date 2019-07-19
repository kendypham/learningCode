import React, { Component } from 'react'

export default class GlobalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalAdvert: {}
        }
    }

    componentDidUpdate() {
        let nextModal = this.props.editAdvert

        if (nextModal != this.state.modalAdvert) {
            this.setState({ modalAdvert: nextModal })
        }

    }

    onView(_id) {
        this.props.getAdvert(_id)
    }

    render() {
        return (
            <div className="table table-hover">
                <table className="table">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Area</th>
                            <th>Bedroom(s)</th>
                            <th>Floor(s)</th>
                            <th>Direction</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.adverts.map((ad, index) =>
                            <tr className="" key={index} >
                                <td >{index + 1}</td>
                                <td align="center"><img src={ad.imageUrl} style={{height:"40vh",width:"40vh" }} alt="" /></td>
                                <td >{ad.title}</td>
                                <td >${ad.price}</td>
                                <td >{ad.area}</td>
                                <td >{ad.bedrooms}</td>
                                <td >{ad.floors}</td>
                                <td >{ad.direction}</td>
                                <td>{ad.address}</td>
                                <td >
                                    <button className="btn btn-outline-dark" onClick={this.onView.bind(this, ad._id)} data-toggle="modal" data-target="#exampleModalCenter" >Details</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered grid-modal-wrapper" role="document">
                        <div className="modal-content content-grid">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLongTitle">{this.state.modalAdvert.title}</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <img id="grid-image" src={this.state.modalAdvert.imageUrl} alt="" />
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="modal-text">
                                                <p className="card-text" align="left" >
                                                    <b>ID: </b>{this.state.modalAdvert.id} <br />
                                                    <b>Price: </b> $ {this.state.modalAdvert.price}<br />
                                                    <b>Area:</b> {this.state.modalAdvert.area} sqft<br />
                                                    <b>Bedrooms: </b>{this.state.modalAdvert.bedrooms}<br />
                                                    <b>Floors: </b>{this.state.modalAdvert.floors}<br />
                                                    <b>Direction: </b>{this.state.modalAdvert.direction}<br />
                                                    <b>Contact Information: </b>{this.state.modalAdvert.contactInfo}<br />
                                                    <b>Address: </b>{this.state.modalAdvert.address}<br />
                                                    <b>Date Posted: </b>{this.state.modalAdvert.postDate}<br />
                                                    <b>Date Expired: </b>{this.state.modalAdvert.expiredDate}<br />
                                                    <b>Project: </b>{this.state.modalAdvert.project}<br />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
