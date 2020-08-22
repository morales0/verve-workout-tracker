import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'typeface-montserrat'
import App from './App';
import { AuthProvider } from './context/auth-context'
import { UserProvider } from './context/user-context'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWFkdLm3ip4KDKV6Je82bMo-HHchAGy7g",
    authDomain: "workout-app-37a10.firebaseapp.com",
    databaseURL: "https://workout-app-37a10.firebaseio.com",
    projectId: "workout-app-37a10",
    storageBucket: "workout-app-37a10.appspot.com",
    messagingSenderId: "645282706661",
    appId: "1:645282706661:web:b20482a6e215f95d4bd00c",
    measurementId: "G-5YLJLYY710"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <AuthProvider auth={firebase.auth()} db={firebase.database()}>
        <App />
    </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
