import React from 'react'
import {connect} from 'react-redux'
import {addStudent,updateStudent, fetchStudent, getStudent, deleteStudent, logIn, register} from './main.js'
class App extends React.Component{

    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
            age: 0,
            userName : "",
            password : ""
        }
    }

    componentDidMount(){
        this.load()
    }

    componentWillReceiveProps(props){
        this.setState({name: props.editedStudent.name, id: props.editedStudent._id, age: props.editedStudent.age,
        userName : props.users.userName, password : props.users.password})
    
    }
    handleChange(e){
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    register(){
        this.props.dispatch(register({
            userName : this.state.userName,
            password : this.state.password
        }))
    }

    login(){
        this.props.dispatch(logIn({
            userName : this.state.userName,
            password : this.state.password
        }))
    }

    addOrUpdate(){

        console.log(this.state)

        if(this.state.id===undefined){
            this.props.dispatch(addStudent({
                name: this.state.name,
                age: this.state.age
            })) 
        }
        else{
            this.props.dispatch(updateStudent({
                _id: this.state.id,
                name: this.state.name,
                age: this.state.age
            }))
        }
    }

    clearForm(){
        this.setState({name: '', id: '', age: 0, userName : "", password : ""})
    }

    load(){
        this.props.dispatch(fetchStudent())
    }
    handleDelete(id){
        if(confirm('Do you want to delete?')){
            this.props.dispatch(deleteStudent(id))  
        }
    }

    handleEdit(id){
        this.props.dispatch(getStudent(id))  
    }
    render(){
        return(
        <div>
            <h1>Student Form</h1>
        Name    
        <input type="text" name='name' value={this.state.name} 
            onChange={this.handleChange.bind(this)}
        /> <br/>
        Age
        <input type="text" name='age' value={this.state.age} 
            onChange={this.handleChange.bind(this)}
        />
        <br/>
        <button onClick={this.addOrUpdate.bind(this)}>Save student</button>

        <button onClick={this.clearForm.bind(this)}>Clear form</button>

        <h1>Student List</h1>
          {this.props.students.map((s)=>
                <li>
                       {s.name} {s.age} 
                       {/* Note that we use _id as _id is generatd by Mongo database */}
                       | <a onClick={()=>this.handleDelete(s._id)}>Delete</a>

                       | <a onClick={()=>this.handleEdit(s._id)}>Edit</a>
                  </li>
              
        )}

        <h1>Register</h1>
        UserName    
        <input type="text" name='userName' value={this.state.userName} 
            onChange={this.handleChange.bind(this)}
        /> <br/>
         Password   
        <input type="text" name='password' value={this.state.password} 
            onChange={this.handleChange.bind(this)}
        /> <br/>
        <button onClick={this.register.bind(this)}>Register</button>
        <button onClick={this.login.bind(this)}>Login</button>
        <button onClick={this.clearForm.bind(this)}>Clear form</button> 
        </div>
        )
    }
}
function mapStateToProps(centralState){
    return {
        students: centralState.students,
        editedStudent: centralState.editedStudent,
        users:centralState.users
    }
}
export default connect(mapStateToProps)(App)
