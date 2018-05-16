import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

const SurveyNew = () =>  <h2>SurveyNew</h2>;


const Landing = () => <h2>Landing</h2>;

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" component={Header}/>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/newSurvey" component={SurveyNew}/>
                </div>
            </BrowserRouter>
        </div>
    )
};

export default App; 