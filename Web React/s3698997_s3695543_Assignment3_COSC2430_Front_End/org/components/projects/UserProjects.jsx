import React, { Component } from 'react'
import ProjectForm from './ProjectForm.jsx'
import Navigation from '../etc/Navigation.jsx'
import { NavLink, Link } from 'react-router-dom'


export default class UserProjects extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.fetchUsersProjects(sessionStorage.getItem('state'))
    }

    handleEdit(_id) {
        this.props.getProject(_id)
    }

    render() {
        if (sessionStorage.getItem('state') === null || sessionStorage.getItem('state') === undefined) {
            return (
                <div className="need-signin" align="center">
                    <h1>It appears that you haven't signed in yet. <p></p> Please click <NavLink to="/signin">here</NavLink> to sign in.</h1>
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

                    <div className="row">
                        <div className="col-sm-12">

                            <button onClick={() => { this.ProjectForm.clearForm() }} type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModal">
                                <i className="fas fa-plus"></i>
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Project Form</h5>
                                            <button onClick={() => { this.ProjectForm.clearForm() }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <ProjectForm
                                                ref={instance => { this.ProjectForm = instance }}
                                                editProject={this.props.editProject}
                                                addProject={(project) => this.props.addProject(project)}
                                                updateProject={(project) => this.props.updateProject(project)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        {this.props.userProjects.map((project, index) =>
                            <div className="col-sm-4" key={index} >
                                <div className="card border-lightgrey mb-3 text-center">
                                    <img className="card-img-top" src={project.imageUrl} alt="" />
                                    <div className="card-body">
                                        <div>
                                            <h5 className="card-title">{project.name}</h5>
                                            <p className="card-text" >
                                                <b>ID:</b> {project.id}<br />
                                                <b>Name:</b> {project.name}<br />
                                                <b>Owner: </b> {project.owner}<br />
                                                <b>Type:</b> {project.type}<br />
                                                <b>Total Area: </b>{project.totalArea}<br />
                                                <b>End Year: </b>{project.endYear}<br />
                                            </p>
                                            <div>
                                                <a role="button" data-toggle="modal" style={{ color: "dark" }} data-target="#exampleModal" className="btn btn-warning" onClick={() => this.handleEdit(project._id)}>
                                                    <i className="fas fa-edit"></i>
                                                </a>
                                                &nbsp;
                                                &nbsp;
                                                <a role="button" className="btn btn-danger" style={{ color: "white" }} onClick={(_id) => this.props.deleteProject(project._id)}><i className="fas fa-trash-alt"></i></a>
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
