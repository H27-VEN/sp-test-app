import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {


    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light margin-bottom">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to="/register" activeClassName="selected" className="nav-item nav-link">Register</NavLink>
                        <NavLink to="/profile" activeClassName="selected" className="nav-item nav-link">Profile</NavLink>
                    </div>
                </div>
                
            </nav>
        );
    }


}

export default Navbar;