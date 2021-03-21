import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-info fw-bold'>
                <div className='container'>
                    <Link to='/' className='navbar-brand logo-part fs-4'>Uber Riders</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ml-auto mb-2 mb-lg-0'>
                            <li className='nav-item px-3 mod'>
                                <Link to='/home' className='nav-link active'>Home</Link>
                            </li>
                            <li className='nav-item px-3 mod'>
                                <Link to='/destination/1' className='nav-link active'>Destination</Link>
                            </li>
                            <li className='nav-item px-3 mod'>
                                <Link to='/blog' className='nav-link active'>Blog</Link>
                            </li>
                            <li className='nav-item px-3 mod'>
                                <Link to='/contact' className='nav-link active'>Contact</Link>
                            </li>
                            
                            {loggedInUser.displayName || loggedInUser.name ? (
                                    <h5 className='nav-link active text-white text-center text-dark'>
                                        {loggedInUser.displayName || loggedInUser.name}
                                    </h5>
                            ) : (
                                    <Link to='/login' className='nav-link active text-white text-center'>
                                        Login
                                    </Link>
                            )}
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;