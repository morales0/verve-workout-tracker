import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'typeface-montserrat'
import App from './App';
import { AuthProvider } from './context/auth-context'
import { UserProvider } from './context/user-context'

ReactDOM.render(
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
