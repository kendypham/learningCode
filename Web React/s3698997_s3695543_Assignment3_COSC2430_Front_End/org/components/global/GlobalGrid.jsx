import React from 'react';
import Pagination from './Pagination.jsx';

export default class GlobalGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOfItems: [],
            modalAdvert: {}
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    componentWillReceiveProps(nextprops) {
        this.setState({ pageOfItems: nextprops.adverts })
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
            <div>
                <div className="container">
                    <div className="row">
                        {this.state.pageOfItems.map((ad, index) => {
                            return (
                                <div className="col-sm-4" key={index} >
                                    <div className="card border-lightgrey mb-3 text-center estate-card">
                                        <img className="card-img-top" style={{maxHeight:"348px", maxWidth:"348px", height:"348px", width:"348px"}} src={ad.imageUrl} alt="" />
                                        <div className="card-body grid-body">
                                            <div>
                                                <h3 className="card-title">{ad.title}</h3>
                                                <hr />

                                                <p className="card-text" align="left" >
                                                    <b>ID:</b> {ad.id} <br />
                                                    <b>Price: </b> $ {ad.price}<br />
                                                    <b>Area:</b> {ad.area} sqft<br />
                                                    <b>Bedrooms: </b>{ad.bedrooms}<br />
                                                    <b>Floors: </b>{ad.floors}<br />
                                                    <b>Direction: </b>{ad.direction}<br />
                                                </p>
                                                <br/>
                                                <button className="btn btn-general" onClick={this.onView.bind(this, ad._id)} data-toggle="modal" data-target="#exampleModalCenter" >Details</button>

                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            Last updated {ad.date}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <br />

                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered grid-modal-wrapper" role="document">
                                <div className="modal-content content-grid">
                                    <div className="modal-header">
                                        <h3 className="modal-title">{this.state.modalAdvert.title}</h3>
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
                                                &nbsp;
                                                &nbsp;
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

                    <br />
                    <Pagination pageSize={6} initialPage={1} items={this.props.adverts} onChangePage={this.onChangePage} />
                </div>
            </div>
        );
    }
}
