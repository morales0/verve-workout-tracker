import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import styled from 'styled-components/macro'

import { Main, Navbar, Nav, UserNavIcon } from './components'
import { Home, Workout } from './pages'

import logo from './logo.svg';
import './App.css';
import verveLogo from './images/verve_fire_logo_1.svg'

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
    <Navbar>
      <img src={verveLogo} alt="React Logo" width="45px"/>
      <Nav justify="right">
        <a href="/">Workout</a>
        <a href="/">Contact</a>
      </Nav>
      <UserNavIcon />
    </Navbar>
  );
}

export default App;
