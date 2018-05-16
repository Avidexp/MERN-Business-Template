import React, {Component} from 'react';


class Header extends Component{
    render(){
        return(
            <div>
            <nav>
            <div class="nav-wrapper">
           <a className="left brand-logo" href="/">Emaily</a>
           <ul className="right">
            <li>
                <a href="/newSurvey">New Survey</a>
            </li>
            <li>
                <a href="/dashboard">Dashboard</a>
            </li>
            <li>
                <a href="/auth/google">Login With Google</a>
            </li>
           </ul>
            </div>
          </nav>

            </div>
        )
    }
}

export default Header;