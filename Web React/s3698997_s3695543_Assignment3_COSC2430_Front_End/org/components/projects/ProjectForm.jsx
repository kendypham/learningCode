import React, { Component } from 'react'

export default class ProjectForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                "_id": "",
                "id": "",
                "name": "",
                "owner": "",
                "type": "",
                "totalArea": "",
                "endYear": "",
                "user": sessionStorage.getItem('state')
            },
            errors: {},
        }
        this.clearForm = this.clearForm.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    static getDerivedStateFromProps(nextProps, previousState) {
        return { fields: nextProps.editProject }
    }

    clearForm() {
        let fields = this.state.fields
        fields["_id"] = "";
        fields["id"] = "";
        fields["name"] = "";
        fields["owner"] = "";
        fields["type"] = "";
        fields["totalArea"] = "";
        fields["endYear"] = "";
        fields["user"] = sessionStorage.getItem('state')
        this.setState({ fields: fields })
    }


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields: fields })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.fields._id === undefined || this.state.fields._id === null || this.state.fields._id === "") {
            if (this.validateForm()) {
                e.preventDefault()
                this.props.addProject({
                    id: this.state.fields.id,
                    name: this.state.fields.name,
                    owner: this.state.fields.owner,
                    type: this.state.fields.type,
                    totalArea: this.state.fields.totalArea,
                    endYear: this.state.fields.endYear,
                    user: sessionStorage.getItem('state')
                })
                this.clearForm()
                alert("Submission successful. You may close the form.")
            }
        }
        else {
            if (this.validateForm()) {
                this.props.updateProject(this.state.fields)
                this.clearForm()
                alert("Update successful. You may close the form.")
            }
        }
    }

    validateForm(e) {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["id"]) {
            formIsValid = false;
            errors["id"] = "*ID is required."
        }

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Name is required."
        }

        if (!fields["owner"]) {
            formIsValid = false;
            errors["owner"] = "*Owner is required."
        }

        if (!fields["type"]) {
            formIsValid = false;
            errors["type"] = "*Type is required."
        }

        if (!fields["totalArea"]) {
            formIsValid = false;
            errors["totalArea"] = "*Total Area is required."
        }

        if (!fields["endYear"]) {
            formIsValid = false;
            errors["endYear"] = "*End year is required."
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        return (
            <form className="needs-validation">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >ID</label>
                        <input type="text" value={this.state.fields.id || ""} name="id" className="form-control" placeholder="ID" onChange={this.handleChange.bind(this)} autoFocus />
                        <div className="invalid-input">{this.state.errors.id}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label >Name</label>
                        <input type="text" value={this.state.fields.name || ""} name="name" className="form-control" placeholder="Name" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.name}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Owner</label>
                        <input type="text" value={this.state.fields.owner || ""} name="owner" className="form-control" placeholder="Owner" onChange={this.handleChange.bind(this)} autoFocus />
                        <div className="invalid-input">{this.state.errors.owner}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label >Type</label>
                        <select value={this.state.fields.type || ""} name="type" className="custom-select" onChange={this.handleChange.bind(this)} >
                            <option >Choose One</option>
                            <option value="House">House</option>
                            <option value="Land">Land</option>
                            <option value="Apartment">Apartment</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Total Area</label>
                        <input type="text" value={this.state.fields.totalArea || ""} name="totalArea" className="form-control" placeholder="Total Area" onChange={this.handleChange.bind(this)} autoFocus />
                        <div className="invalid-input">{this.state.errors.totalArea}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label >End Year</label>
                        <input type="text" value={this.state.fields.endYear || ""} name="endYear" className="form-control" placeholder="End Year" onChange={this.handleChange.bind(this)} />
                        <div className="invalid-input">{this.state.errors.endYear}</div>
                    </div>
                </div>
                <button type="submit" data-dismiss={this.state.submitted === true ? "modal" : null} onClick={this.onSubmit.bind(this)} className="btn btn-primary">Save</button>

            </form>
        )
    }
}
