import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0, user } from '../../auth-wrapper';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();
  const [userDropdownState, setUserDropdownState] = useState(false);

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link
          className='navbar-item'
          to='/'>
          <h1>greatFLIX</h1>
        </Link>

        <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div className='navbar-menu'>
        <div className='navbar-end'>
          {!isAuthenticated && (
            <div className='navbar-item'>
              <div className='buttons'>
                <a className='button is-primary'>
                  <strong>Sign up</strong>
                </a>
                <a
                  className='button is-light'
                  onClick={() => loginWithRedirect({})}>
                  Log in
                </a>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div className={`navbar-item has-dropdown ${userDropdownState ? 'is-active' : ''}`}>
              <a
                className='navbar-link'
                onMouseOver={() => setUserDropdownState(true)}
                onMouseLeave={() => setUserDropdownState(false)}>
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
                  to='/settings'>
                  <i className='fas fa-cog'></i>&nbsp;Settings
                </Link>
                <a
                  className='navbar-item'
                  onClick={() => logout({})}>
                  <i className='fas fa-sign-out-alt'></i>&nbsp;Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
/*
<div className='navbar-start'>
  <div className='navbar-item has-dropdown is-hoverable'>
    <a className='navbar-link'>
      More
    </a>

    <div className='navbar-dropdown'>
      <a className='navbar-item'>
        About
      </a>
      <a className='navbar-item'>
        Jobs
      </a>
      <a className='navbar-item'>
        Contact
      </a>
      <hr className='navbar-divider' />
      <a className='navbar-item'>
        Report an issue
      </a>
    </div>
  </div>
</div>
*/
export default Navbar;
