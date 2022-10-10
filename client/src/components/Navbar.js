import React, {useContext} from "react";
import {NavLink } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar=()=>{
    const auth=useContext(AuthContext)

    const logoutHandler=event=> {
        event.preventDefault();
        auth.logout();
    }

    return(
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">Reload Links</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">create</NavLink></li>
                    <li><NavLink to="/links">links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a> </li>
                </ul>
            </div>
        </nav>
    )
}