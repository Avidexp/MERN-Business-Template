import React, {Component} from 'react';
import Payments from './Payments';
import {Card, CardTitle} from 'react-materialize'

class BuyCredits extends Component{
    render(){
        return(
            <div>
                <h1>Buy Credits</h1>
                <div class="row">
                <div class="col s3">
                <Card>
                   <h4>5$</h4>
                   <h4>500 Credits</h4>
                    <Payments description="500 Credits for $5" amount={500} credits={500} />
                </Card>
                </div>
                <div class="col s3">
                <Card >
                    <h4>10$</h4>
                    <h4>1100 Credits</h4>
                    <Payments description="1100 Credits for $10" amount={1000} credits={1100} />
                </Card>
                </div>
                </div>
                <div class="row">
                <div class="col s3">
                <Card>
                    <h4>15$</h4>
                    <h4>1600 Credits</h4>
                    <Payments description="1600 Credits for $15" amount={1500} credits={1600} />
                </Card>
                </div>
                <div class="col s3">
                <Card >
                    <h4>20$</h4>
                    <h4>2400 Credits</h4>
                    <Payments description="2400 Credits for $20" amount={2000} credits={2400} />
                </Card>
                </div>
                
                </div>
            </div>
        )
    }
}

export default BuyCredits;