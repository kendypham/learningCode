import React from 'react';
import { Redirect, Link } from 'react-router-dom'

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			fields: {
				"username": "",
				"password": "",
			},
			errors: {}
		}

		this.handleChange = this.handleChange.bind(this);
		this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
	};



	componentWillReceiveProps(nextProps) {
		if (nextProps.status.registration === "failed") {
			alert("Your account has already been registered, please try again.")
		}
	}

	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({
			fields
		});

	}

	submituserRegistrationForm(e) {
		e.preventDefault();

		if (this.validateForm()) {
			let fields = {};
			fields["username"] = "";
			fields["password"] = "";
			this.setState({ fields: fields });
			this.props.register({ username: this.state.fields.username, password: this.state.fields.password })
		}
	}

	validateForm() {

		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		if (!fields["username"]) {
			formIsValid = false;
			errors["username"] = "*Please enter your username.";
		}

		if (typeof fields["username"] !== "undefined") {
			if (!fields["username"].match(/^.*(?=.{5,})(?=.*[a-z]).*$/)) {
				formIsValid = false;
				errors["username"] = "*Your pasword must have 6 characters, a lowercase letter and an uppercase letter, and a number";
			}
		}


		if (!fields["password"]) {
			formIsValid = false;
			errors["password"] = "*Please enter your password.";
		}

		if (typeof fields["password"] !== "undefined") {
			if (!fields["password"].match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
				formIsValid = false;
				errors["password"] = "*Your password must have 6 characters, a lowercase letter and an uppercase letter";
			}
		}

		this.setState({
			errors: errors
		});

		return formIsValid;
	}



	render() {

		if (this.props.status.registration === "successful") {
			alert('Registration successful! You will be redirected to Sign In Page.')
			return (<Redirect to="/signin" />)
		}

		else {
			return (
				<div className="container register-background">
					<div className="row">
						<div className="col-sm-7"></div>
						<div className="col-sm-5">
							<div className="card card-register">

								<h4 className="card-header text-center register-header" >Welcome</h4>
								<h6 className="card-header text-center register-header">Enter Your Username and Password Below </h6>
								<br />

								<form method="post" onSubmit={this.submituserRegistrationForm} >
									<label>Name &nbsp;
										<div className="tooltip-username"><i className="fas fa-info-circle"></i>
											<span className="tooltiptext-username"> Your pasword must have 6 characters, a lowercase letter and an uppercase letter, and a number.</span>
										</div>
									</label>

									<input className="form-control" type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} autoFocus />
									<div className="errorMsg">{this.state.errors.username}</div>

									<label>Password &nbsp;
									<div className="tooltip-password"><i className="fas fa-info-circle"></i>
											<span className="tooltiptext-password"> Your password must have 6 characters, a lowercase letter and an uppercase letter and must not contain spaces, special characters, or emoji.</span>
										</div>
									</label>

									<input className="form-control" type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
									<div className="errorMsg">{this.state.errors.password}</div>
									<br />
									<input type="submit" className="button button-register form-control" value="Register" />
									<br />

								</form>
							</div>
						</div>
					</div>

					<Link to="/home" >
						<button type="button" className="btn btn-home">
							<i className="fas fa-home"></i>
						</button>
					</Link>
				</div>
			);
		}

	}

}


export default Register;