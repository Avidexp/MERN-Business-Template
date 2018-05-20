import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import './app.css';


import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import BuyCredits from './BuyCredits';
import Login from './login';
import Signup from './Signup';
const SurveyNew = () =>  <h2>New Survey</h2>;



class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/newSurvey" component={SurveyNew}/>
                        <Route exact path="/BuyCredits" component={BuyCredits}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App); 


