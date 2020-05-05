import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '../../auth-wrapper';
import { Link } from 'react-router-dom';
import { styles } from './styles';

const Navbar = () => {
    const auth0Context = useAuth0();
    const isAuthenticated = auth0Context && auth0Context.isAuthenticated;
    const loginWithRedirect = auth0Context && auth0Context.loginWithRedirect;
    const logout = auth0Context && auth0Context.logout;
    const loading = auth0Context && auth0Context.loading;
    const user = auth0Context && auth0Context.user;
    const [userDropdownState, setUserDropdownState] = useState(false);
  
    return (
        <nav className='navbar is-black' role='navigation' aria-label='main navigation'>
            <div className='container' style={styles.navbarBody}>
                <div className='navbar-brand'>
                    <Link
                        className='navbar-item has-text-primary'
                        to='/'>
                        <h1 style={styles.navbarLink}>Greatflix</h1>
                    </Link>
            
                    <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                    </a>
                </div>
        
                <div className='navbar-menu'>
                    <div className='navbar-start'>
                        <div className='navbar-item has-dropdown is-hoverable'>
                            <a 
                                className='navbar-link has-text-primary'
                                style={styles.navbarLink}>
                                Movies
                            </a>
                            <div className='navbar-dropdown'>
                                {isAuthenticated && (
                                    <>
                                        <Link 
                                            className='navbar-item'
                                            to='/movies'>
                                            Favorites
                                        </Link>
                                        <hr className="navbar-divider"></hr>
                                    </>
                                )}

                                <Link
                                    className='navbar-item'
                                    to='/movies/now-playing'
                                >
                                    Now Playing
                                </Link>

                                <Link
                                    className='navbar-item'
                                    to='/movies/popular'
                                >
                                    Popular
                                </Link>

                                <Link
                                    className='navbar-item'
                                    to='/movies/top-rated'
                                >
                                    Top Rated
                                </Link>

                                <Link 
                                    className='navbar-item'
                                    to='/movies/upcoming'
                                >
                                    Upcoming
                                </Link>
                            </div>
                        </div>
                        
                        <div className='navbar-item has-dropdown is-hoverable'>
                            <a 
                                className='navbar-link has-text-primary'
                                style={styles.navbarLink}>
                                TV Shows
                            </a>
                            <div className='navbar-dropdown'>
                                {isAuthenticated && (
                                    <>
                                        <Link 
                                            className='navbar-item'
                                            to='/shows'>
                                            Favorites
                                        </Link>
                                        <hr className="navbar-divider"></hr>
                                    </>
                                )}

                                <Link
                                    className='navbar-item'
                                    to='/shows'
                                >
                                    On Today
                                </Link>

                                <Link
                                    className='navbar-item'
                                    to='/shows'
                                >
                                    On Air
                                </Link>

                                <Link
                                    className='navbar-item'
                                    to='/shows'
                                >
                                    Popular
                                </Link>

                                <Link 
                                    className='navbar-item'
                                    to='/shows'
                                >
                                    Top Rated
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='navbar-end'>
                        {!isAuthenticated && (
                        <div className='navbar-item'>
                            <div className='buttons'>
                            <a className='button is-primary'>
                                <strong>Sign up</strong>
                            </a>
                            <a
                                className='button is-light has-text-primary'
                                onClick={() => loginWithRedirect && loginWithRedirect({})}>
                                Log in
                            </a>
                            </div>
                        </div>
                        )}
            
                        {isAuthenticated && (
                        <div className={`navbar-item has-dropdown ${userDropdownState ? 'is-active' : ''}`}>
                            <a
                                className='navbar-link has-text-primary'
                                onMouseOver={() => setUserDropdownState(true)}
                                onMouseLeave={() => setUserDropdownState(false)}
                                style={styles.navbarLink}>
                                <i className='fas fa-user'></i>&nbsp;
                                {!loading && (
                                    user.name
                                )}
                            </a>
            
                            <div
                                className='navbar-dropdown is-right'
                                onMouseOver={() => setUserDropdownState(true)}
                                onMouseLeave={() => setUserDropdownState(false)}>
                                    <Link
                                        className='navbar-item'
                                        to='/settings'
                                        style={styles.navbarLink}>
                                        <i className='fas fa-cog'></i>&nbsp;Settings
                                    </Link>
                                    <a
                                        className='navbar-item'
                                        onClick={() => logout && logout({})}
                                        style={styles.navbarLink}>
                                        <i className='fas fa-sign-out-alt'></i>&nbsp;Logout
                                    </a>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;