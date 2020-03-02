import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userName, isLoggedIn, onLogout }) => (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i className="fas fa-book fa-2x"></i>
                    <span className="h4 pl-2">PersonalNotes MGR</span>
                </div>
            </Link>
            {isLoggedIn &&
                <h4 className="ml-auto mr-4">
                    <span className="badge badge-pill badge-secondary text-capitalize">
                        Welcome {userName} !
                </span>
                </h4>}
            {isLoggedIn &&
                <button type="button" onClick={onLogout} className="btn btn-outline-warning">
                    Logout | <i className="fas fa-sign-out-alt"></i>
                </button>}
        </div>
    </nav>
);

export default Header;
