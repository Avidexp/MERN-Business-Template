import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (<div>
                <li>
                    <a href="/signup">Sign Up</a>
                </li>    
                <li>
                    <a href="/login">Login</a>
                </li>        
                <li>
                    <a href="/auth/google">Login With Google</a>
                </li>  
                </div>    );
            default:
                return( <div>
            <li style={{margin: '0 10px'}}>Credits: {this.props.auth.credits} </li>

            <li>
                <Link to="/BuyCredits">Buy Credits</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <a href="/api/logout">Logout</a>
            </li></div>);
        }
    }
    render(){
        return(
            <div>
            <nav>
            <div className="nav-wrapper">
           <Link className="left brand-logo" 
            //    Different route if user is authenticated 
            to={this.props.auth ? "/" : "/"} 
           >Logo</Link>
           <ul className="right">
           {this.renderContent()}



           </ul>
            </div>
          </nav>

            </div>
        )
    }
}
function mapStateToProps({auth}){
    return{ auth: auth };
}

export default connect(mapStateToProps)(Header);