// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {SocketProvider} from './context/SocketProvider/SocketProvider'
import App from './App';
import './assets/scss/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <GoogleOAuthProvider clientId="1086194080837-m79ho3ov2ipvgpij7utbbr02o4bgjjc8.apps.googleusercontent.com">
      <SocketProvider>
        <App />
        </SocketProvider>
    </GoogleOAuthProvider>
);