import React, {Component} from 'react';
import axios from 'axios';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state ={
            email:"",
            password:"",
            firstName: "",
            lastName: ""
        }
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
     }
     handlePasswordChange= (e)=> {
        this.setState({password: e.target.value});
     }
     handleFirstChange = (e) => {
        this.setState({firstName: e.target.value});
     }
     handleLastChange= (e)=> {
        this.setState({lastName: e.target.value});
     }
     handleSubmit= () =>{
        var username = this.state.email;
        var password = this.state.password;
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        console.log(username);
        console.log(password);
        axios.post('http://localhost:3000/signupUser', {email: username, password: password, firstName: firstName, lastName: lastName})
        .then(response => {
            console.log(response);
        });
        this.props.fetchUser();
    }
    render(){

        return(
            <div>
<form action="http://localhost:3000/signupUser" method="post">
    <div>
    <input type="text" name="firstName" placeholder="FirstName" value={this.state.firstName} onChange={this.handleFirstChange} />
    <input type="text" name="lastName" placeholder="lastName" value={this.state.lastName} onChange={this.handleLastChange} />

    <input type="text" name="username" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          {/* <button type="submit" onClick={this.handleSubmit}>Sign Up</button> */}
          <button type="submit" onClick={this.handleSubmit}>Sign Up</button>


</form>
<div>
      
    </div>
            </div>
        )
    }
}

export default Signup;

