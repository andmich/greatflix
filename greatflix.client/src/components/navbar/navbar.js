import React from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '../../auth-wrapper';

const Navbar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='https://bulma.io'>
          <h1>greatFLIX</h1>
        </a>

        <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {!isAuthenticated && (
                [
                  <a className='button is-primary'>
                    <strong>Sign up</strong>
                  </a>,
                  <a
                    className='button is-light'
                    onClick={() => loginWithRedirect({})}>
                    Log in
                  </a>
                ]
              )}
              {isAuthenticated && (
                <a
                  className='button is-light'
                  onClick={() => logout()}>
                  Log out
                </a>
              )}
            </div>
          </div>
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
