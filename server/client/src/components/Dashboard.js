import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
class Dashboard extends Component{
    render(){
        return(
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default connect(null,actions)(Dashboard);