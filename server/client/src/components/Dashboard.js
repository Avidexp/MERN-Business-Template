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
                <div class="container">
                <div class="row">
                <div class="col s6">
                <div class="card">
                <div class="card-content">
                <span class="card-title">Financials</span>
                 {this.state.user ? <div>
                     <h2>Welcome, {this.state.user.firstName}</h2>  
                     <h3> Your balance is: {this.state.user.credits}</h3>
                     </div>: <p></p>}
                </div>
                </div>
                </div>
                <div class="col s6">
                <div class="card">
                <div class="card-content">
                <span class="card-title">Analytics</span>
                 {this.state.user ? <div>
                     <h2>Welcome, {this.state.user.firstName}</h2>  
                     <h3> Your balance is: {this.state.user.credits}</h3>
                     </div>: <p></p>}
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({auth}){
    return{ auth: auth };
}


export default connect(mapStateToProps,actions)(Dashboard);