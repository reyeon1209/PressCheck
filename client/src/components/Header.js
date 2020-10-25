import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="sns"></div>
                <div className="logo">PressCheck</div>{/* install Bold Italic Roboto */}
                <div className="menu">
                    <Link to="/"><div className="menu-item">Home</div></Link>
                    <Link to="/news"><div className="menu-item">News</div></Link>
                    <Link to="/todays"><div className="menu-item">Today's</div></Link>
                </div>
            </div>
        );
    }
} 
export default Header;