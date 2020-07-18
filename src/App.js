import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import styled from 'styled-components/macro'

import { Main } from './components'
import { Home, Workout } from './pages'

import logo from './logo.svg';
import './App.css';

function App() {
  console.log(localStorage)
  
  return (
    <Router>
      {/* Route a header depending on path here */}
      <header>
        <Switch>
          <Route path="/login">
            <h1>Login/Signup Header</h1>
          </Route>

          <Route path="/signup">
            <h1>Login/Signup Header</h1>
          </Route>

          <Route path="/workout">
            <BasicNavbar />
          </Route>

          <Route path="/" exact={true}>
            <BasicNavbar />
          </Route>

          <Route path="*">
            <h1>Not found header</h1>
          </Route>
        </Switch>
      </header>

      {/* Route the path's body here */}
      <Main>
        <Switch>
          <Route path="/login">
            <h1>Login</h1>
          </Route>

          <Route path="/signup">
            <h1>Signup</h1>
          </Route>

          <Route path="/workout">
            <Workout />
          </Route>

          <Route path="/" exact={true}>
            <Home/>
          </Route>

          <Route path="*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

const BasicNavbar = (props) => {
  return (
    <div css={`
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: .25rem 1rem;
      position: relative;
      z-index: 99;
      background: #ffffff;
      box-shadow: 0 0 5px 0 #00000044;
    `}>
      <h2>Verve</h2>
      <nav>
        <a href="/">Workout</a>
        <a href="/">Contact</a>
      </nav>
    </div>
  );
}

export default App;
