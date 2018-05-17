import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';
class Payments extends React.Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description={this.props.description}
        token={token => this.props.handleToken(token, this.props.amount, this.props.credits)}
        amount={this.props.amount}// USD in cents
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      {/* Custom button */}
      <button className="btn">
        Add Credits
      </button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments);