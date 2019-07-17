import React from 'react';

// css
import './AppPreloader.css';

const AppPreloader = () => {
  return (
    <div id='appPreloader' style={{textAlign: 'center'}}>
      <img src='/loading.gif' alt='loading'/>
    </div>
  );
};

export default AppPreloader;
