import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.auth
        }
    }
    componentWillMount(){
        this.props.fetchUser();
        console.log(this.state);
    }
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        
        return(
            <div>
                
                 {this.state.user ? <h1>Welcome, {this.state.user.firstName}</h1>  : <p></p>}
            </div>
        )
    }
}
function mapStateToProps({auth}){
    return{ auth: auth };
}


export default connect(mapStateToProps,actions)(Dashboard);