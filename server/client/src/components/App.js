import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';


import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';

const SurveyNew = () =>  <h2>New Survey</h2>;
const BuyCredits = () =>  <h2>Buy Credits</h2>;


class App extends Component {
    componentDidMount(){

        this.props.fetchUser();

    }
    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/newSurvey" component={SurveyNew}/>
                        <Route exact path="/BuyCredits" component={BuyCredits}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App); 


