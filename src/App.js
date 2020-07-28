import React, { useState, useEffect } from 'react';

import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro'
import ls from 'local-storage'

import { Main, Navbar, Nav, UserNavIcon, Button } from './components'
import { Home, Workout } from './pages'

import logo from './logo.svg';
import './App.css';
import verveLogo from './images/verve_fire_logo_1.svg'
import { lightTheme } from './css/themes'
import { useGlobalState } from './hooks/useGlobalState';

function App() {
  const [themeValue, setThemeValue] = useState(ls('theme') ? ls('theme') : lightTheme)

  useEffect(() => {
    ls('theme', themeValue)
  }, [themeValue])
  
  return (
    <ThemeProvider theme={{themeValue, setThemeValue}}>
      <>
      <GlobalStyle />
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

            <Route path="/workout/*">
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

            <Route path="/workout/:wid">
              <Workout/>
            </Route>
            
            <Route path="/" exact={true}>
              <Home/>
              <Button />
            </Route>

            <Route path="*">
              <h1>Not found</h1>
            </Route>
          </Switch>
        </Main>
      </Router>
      </>
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.themeValue.mainFG};
    background: ${props => props.theme.themeValue.mainBG};
  }
`

const BasicNavbar = (props) => {
  return (
    <Navbar>
      <a href="/">
        <img src={verveLogo} alt="React Logo" width="45px"/>
      </a>
      <Nav justify="right">
        <a href="/">Workout</a>
        <a href="/">Contact</a>
      </Nav>
      <UserNavIcon />
    </Navbar>
  );
}

export default App;
