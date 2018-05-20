import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../actions';


class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            email:"",
            password:""
        }
    }
    componentDidMount(){
        this.props.fetchUser();
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
     }
     handlePasswordChange= (e)=> {
        this.setState({password: e.target.value});
     }
     handleSubmit= () =>{
        var username = this.state.email;
        var password = this.state.password;
        console.log(username);
        console.log(password);

        axios.post('http://localhost:3000/loginUser', {username: username, password: password})
        .then(response => {
            console.log(response);
            console.log(this.props);
        });
        this.props.fetchUser();
    }
    render(){

        return(
            <div>
        <form action="http://localhost:3000/loginUser" method="post">
            <div>
        <input type="text" name="username" placeholder="username" value={this.state.email} onChange={this.handleEmailChange} />
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </div>
                <button type="submit" onClick={this.handleSubmit}>Login</button>
        
</form>
            </div>
        )
    }
}
function mapStateToProps({auth}){
    return{ auth: auth };
}


export default connect(mapStateToProps,actions)(Login);
