import React from 'react';
import { useAuth0 } from '../../auth-wrapper';
import { Redirect } from 'react-router-dom';
import Preloader from '../../components/preloader/preloader';
// import FavoriteGenres from '../../components/favorites/favoritegenres';
// import FavoriteMovies from '../../components/favorites/favoritemovies';

import "./settings.css";

const Settings = () => {
    var authContext = useAuth0();
    const loading = authContext!.loading;
    const user = authContext!.user;
    return(
        <div>
            {loading && (
                <Preloader />
            )}

            {!loading && user && (
                <div className='user-container'>
                <div className='columns'>
                  <div className='column is-one-quarter' style={{textAlign: 'left'}}>
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
                    {/* <FavoriteMovies /> */}

                    <div>
                      <h1 className='title'>Favorite TV Shows</h1>

                      <hr />
                    </div>

                    {/* <FavoriteGenres /> */}
                  </div>
                </div>
              </div>
            )}

            {!loading && !user && (
                <Redirect
                    to={{
                        pathname: '/'
                }}/>
            )}
        </div>
    )
}

export default Settings;