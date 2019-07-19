import React, { Component } from 'react'


export default class EstateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                "_id": "",
                "id": "",
                "title": "",
                "price": "",
                "area": "",
                "bedrooms": "",
                "floors": "",
                "direction": "",
                "contactInfo": "",
                "address": "",
                "postDate": "",
                "expiredDate": "",
                "imageUrl": "",
                "project": "",
                "date": "",
                "user": sessionStorage.getItem('state')
            },
            errors: {}
        }
        this.clearForm = this.clearForm.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    static getDerivedStateFromProps(nextProps, previousState) {
        return { fields: nextProps.editAdvert }
    }

    clearForm() {
        let fields = this.state.fields
        fields["_id"] = "";
        fields["id"] = "";
        fields["title"] = "";
        fields["price"] = "";
        fields["area"] = "";
        fields["bedrooms"] = "";
        fields["floors"] = "";
        fields["direction"] = "";
        fields["contactInfo"] = "";
        fields["address"] = "";
        fields["postDate"] = "";
        fields["expiredDate"] = "";
        fields["imageUrl"] = "";
        fields["project"] = "";
        fields["user"] = sessionStorage.getItem('state')
        this.setState({ fields: fields })
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.fields._id === undefined || this.state.fields._id === null || this.state.fields._id === "") {
            if (this.validateForm()) {
                this.props.addAdvert({
                    id: this.state.fields.id,
                    title: this.state.fields.title,
                    price: this.state.fields.price,
                    area: this.state.fields.area,
                    bedrooms: this.state.fields.bedrooms,
                    floors: this.state.fields.floors,
                    direction: this.state.fields.direction,
                    contactInfo: this.state.fields.contactInfo,
                    address: this.state.fields.address,
                    postDate: this.state.fields.postDate,
                    expiredDate: this.state.fields.expiredDate,
                    imageUrl: this.state.fields.imageUrl,
                    project: this.state.fields.project,
                    user: sessionStorage.getItem('state')
                })
                this.clearForm()
                alert("Submission successful. You may close the form.")
            }
        }

        else {
            if (this.validateForm()) {
                this.props.updateAdvert(this.state.fields)
                this.clearForm()
                alert("Update successful. You may close the form.")
            }
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["id"]) {
            formIsValid = false;
            errors["id"] = "*ID is required."
        }

        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "*Title is required."
        }

        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "*Price is required."
        }

        if (!fields["area"]) {
            formIsValid = false;
            errors["area"] = "*Area is required."
        }

        if (!fields["bedrooms"]) {
            formIsValid = false;
            errors["bedrooms"] = "*Bedroom(s) is required."
        }

        if (!fields["floors"]) {
            formIsValid = false;
            errors["floors"] = "*Floor(s) is required."
        }

        if (!fields["direction"]) {
            formIsValid = false;
            errors["direction"] = "*Direction is required."
        }

        if (!fields["contactInfo"]) {
            formIsValid = false;
            errors["contactInfo"] = "*Contact Information is required."
        }

        if (!fields["address"]) {
            formIsValid = false;
            errors["address"] = "*Address is required."
        }

        if (!fields["postDate"]) {
            formIsValid = false;
            errors["postDate"] = "*Post Date is required."
        }

        if (!fields["expiredDate"]) {
            formIsValid = false;
            errors["expiredDate"] = "*Expired Date is required."
        }

        if (!fields["imageUrl"]) {
            formIsValid = false;
            errors["imageUrl"] = "*A Photo is required."
        }

        if (!fields["project"]) {
            formIsValid = false;
            errors["project"] = "*Project is required."
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        return (
            <form method="post" onSubmit={this.onSubmit} className="needs-validation">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >ID</label>
                        <input type="text" value={this.state.fields.id || ""} name="id" className="form-control" placeholder="ID" onChange={this.handleChange.bind(this)} autoFocus />
                        <div className="invalid-input">{this.state.errors.id}</div>

                    </div>

                    <div className="form-group col-md-6">
                        <label >Title</label>
                        <input type="text" value={this.state.fields.title || ""} name="title" className="form-control" placeholder="Title" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.title}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Price</label>
                        <input type="text" value={this.state.fields.price || ""} name="price" className="form-control" placeholder="Price" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.price}</div>
                    </div>

                    <div className="form-group col-md-6">
                        <label >Area</label>
                        <input type="text" value={this.state.fields.area || ""} name="area" className="form-control" placeholder="Area" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.area}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Bedrooms</label>
                        <select value={this.state.fields.bedrooms || ""} name="bedrooms" className="custom-select" onChange={this.handleChange.bind(this)} >
                            <option >Choose One</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                        <div className="invalid-input">{this.state.errors.bedrooms}</div>
                    </div>

                    <div className="form-group col-md-6">
                        <label >Floors</label>
                        <select value={this.state.fields.floors || ""} name="floors" className="custom-select" onChange={this.handleChange.bind(this)}>
                            <option >Choose One</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div className="invalid-input">{this.state.errors.floors}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Direction</label>
                        <select value={this.state.fields.direction || ""} name="direction" className="custom-select" onChange={this.handleChange.bind(this)}>
                            <option >Choose One</option>
                            <option value="North">North</option>
                            <option value="East">East</option>
                            <option value="South">South</option>
                            <option value="West">West</option>
                        </select>
                        <div className="invalid-input">{this.state.errors.direction}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Contact Information</label>
                        <textarea value={this.state.fields.contactInfo || ""} name="contactInfo" type="text" className="form-control" placeholder="Contact Information" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.contactInfo}</div>
                    </div>

                    <div className="form-group col-md-6">
                        <label >Address</label>
                        <textarea value={this.state.fields.address || ""} name="address" type="text" className="form-control" placeholder="Address" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.address}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Post Date</label>
                        <input value={this.state.fields.postDate || ""} name="postDate" type="date" className="form-control" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.postDate}</div>
                    </div>

                    <div className="form-group col-md-6">
                        <label >Expired Date</label>
                        <input value={this.state.fields.expiredDate || ""} name="expiredDate" type="date" className="form-control" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.expiredDate}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Photo</label>
                        <input value={this.state.fields.imageUrl || ""} name="imageUrl" type="text" className="form-control" placeholder="URL" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.imageUrl}</div>                    
                    </div>

                    <div className="form-group col-md-6">
                        <label >Project</label>
                        <select value={this.state.fields.project || ""} name="project" className="custom-select" onChange={this.handleChange.bind(this)}>
                            <option >Choose One</option>
                            {this.props.projects.map((name, index)=> {
                                return(
                                    <option value={name.name} key={index} >{name.name}</option>
                                )
                            })}
                        </select>
                        <div className="invalid-input">{this.state.errors.project}</div>                    
                    </div>
                </div>

                <input type="submit" className="btn btn-primary form-control" value="Save" />
                <button data-dismiss="modal" className="btn btn-danger form-control" >Close</button>
            </form>

        )
    }
}
