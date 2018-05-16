import React, {Component} from 'react';
import { connect } from 'react-redux';

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return (<li>
                    <a href="/auth/google">Login With Google</a>
                </li>            );
            case false:
                return (<li>
                    <a href="/auth/google">Login With Google</a>
                </li>            );
            default:
                return( <div><li>
                <a href="/newSurvey">New Survey</a>
            </li>
            <li>
                <a href="/dashboard">Dashboard</a>
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
            <div class="nav-wrapper">
           <a className="left brand-logo" href="/">Emaily</a>
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