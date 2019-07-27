import React from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '../../auth-wrapper';

// css
import './settings.css'

// components
import Preloader from '../preloader/preloader';

// context
import { StateConsumer } from '../../contexts/statecontext';
import FavoriteGenres from '../favorites/favoritegenres';

const Settings = (props) => {
  const { loading, user } = useAuth0();
  return (
    <StateConsumer>
      {([state, func]) => {
        return(
          <div>
            {loading && (
              <Preloader />
            )}

            {!loading && (
              <div className='user-container'>
                <div className='columns'>
                  <div className='column is-one-quarter' style={{textAlign: 'left !important'}}>
                    <div className='container is-fluid'>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                        <figure className='image is-128x128'>
                          <img
                            src={user.picture}
                            className='is-rounded'
                            alt={user.name}/>
                        </figure>
                        <h3 style={{marginLeft: '20px'}}>
                          <i className='fas fa-user'></i>&nbsp;{user.nickname}
                        </h3>
                      </div>
                      <hr />
                      <table className='table'>
                        <tbody>
                          <tr>
                            <td><strong>First Name</strong></td>
                            <td>{user.given_name}</td>
                          </tr>
                          <tr>
                            <td><strong>Last Name</strong></td>
                            <td>{user.family_name}</td>
                          </tr>
                          <tr>
                            <td><strong>Email</strong></td>
                            <td>{user.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='column'>
                    <div>
                      <h1 className='title'>Favorite Movies</h1>

                      <hr />

                    </div>
                    <div>
                      <h1 className='title'>Favorite TV Shows</h1>

                      <hr />
                    </div>

                    <FavoriteGenres />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }}
    </StateConsumer>
  )
}

export default Settings
