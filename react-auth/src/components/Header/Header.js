import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <nav className='navbar navbar-light bg-success'>
                <div className='container-fluid'>
                    <Link to='/' className='navbar-brand logo-part'>
                        Uber Riders
                    </Link>
                    <div className='d-flex'>
                        <Link to='/home' className='nav-link active'>
                            Home
                        </Link>
                        <Link to='/destination/1' className='nav-link active'>
                            Destination
                        </Link>
                        <Link to='/blog' className='nav-link active'>
                            Blog
                        </Link>
                        <Link to='/contact' className='nav-link active'>
                            Contact
                        </Link>
                        <Link to='/login' className='nav-link active type="button" class="btn btn-danger'>
                            Login
                        </Link>
                        <h5>{loggedInUser.name}</h5>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
