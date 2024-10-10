import React, { useState, useEffect } from 'react';
import NioButton from '../NioButton/NioButton';

const CookieDisclaimer = () => {
 
  return (
    <div className="cookie-disclaimer fixed-bottom" style={{ 
        background: 'rgba(255,255,255,0.5)',
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.25)',
        color: 'black', // Adjust text color as needed
        padding: '15px', // Adjust padding as needed
      }}>      <div className="container text-center">
        <div className="cookie-close accept-cookie" ><i className="fa fa-times"></i></div>
        <p> TektAI   give you two weeks for your account activation 
          <br /> You need to choose one of our  pricing mode to start creating challenge</p>
                 <NioButton href="/index-bs-subscription" className="btn-indigo" label="Let's Discover" />
      </div>
    </div>
  );
};

export default CookieDisclaimer;
