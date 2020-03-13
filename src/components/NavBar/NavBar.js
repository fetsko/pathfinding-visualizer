import React from 'react';
import './NavBar.css';

const navbar = props => (
    <header className="navbar">
        <nav className="navbar__navigation">
            <div></div>
            <div className="navbar__logo"><a href="/">THE LOGO</a></div>
            <div className="spacer"/>
            <div className="navbar__navigation-items">
                <ul>
                    <li><a href="/">Products</a></li>
                    <li><a href="/">Users</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navbar;