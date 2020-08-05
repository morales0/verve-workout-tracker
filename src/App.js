import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, useParams, Redirect} from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro'
import ls from 'local-storage'
import { v4 as uuidv4 } from 'uuid';
import {isMobile} from 'react-device-detect'

// Hooks & Context
import { useGlobalState } from './hooks/useGlobalState';
import { useUser } from './context/user-context';

// Components & Pages
import { Main, Navbar, Nav, UserNavIcon, Button } from './components'
import { Home, Workout, Gains } from './pages'
import ViewComponents from './pages/ViewComponents/ViewComponents';

// Other assets
import verveLogo from './images/verve_fire_logo_1.svg'
import { lightTheme } from './css/themes'

// Main app: routes headers and pages
const App = () => {
  const [themeValue, setThemeValue] = useState(ls('theme') ? ls('theme') : lightTheme)
  const {user, dispatch} = useUser()

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

            <Route path="/gains">
              <BasicNavbar />
            </Route>

            <Route path="/viewcomponents">
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

            <Route path="/workout/new">
              <CreateWorkout /> 
            </Route>

            <Route path="/workout/:wid">
              <Workout />
            </Route>

            <Route path="/workout" exact={true}>
              {
                user.isWorkingOut ? <Redirect to={`/workout/${user.currentWorkoutID}`} /> :
                <Redirect to="/" />
              }
            </Route>

            <Route path="/gains">
              <Gains />
            </Route>

            <Route path="/viewcomponents">
              <ViewComponents />
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

/* Temporary Components */

// Authenticated navbar
const BasicNavbar = (props) => {
  return (
    <Navbar>
      <a href="/" css={`
        margin: 1rem 0;
      `}>
        <img src={verveLogo} alt="React Logo" width="45px"/>
      </a>
      <Nav justify="right">
        {/* <a href="/">Workout</a>
        <a href="/">Contact</a> */}
        {!isMobile ? <a href="/viewcomponents">Test Components</a> : null}
      </Nav>
      <UserNavIcon />
    </Navbar>
  );
}

// Create a new workout and redirect
const CreateWorkout = (props) =>{
  const [newID, setNewID] = useState(null)
  const {user, dispatch} = useUser()

  useEffect(() => {
    const wid = uuidv4()
    dispatch({type: 'createNewWorkout', wid: wid})
    console.log("After dispatch")

    setTimeout(() => setNewID(wid), 1000)
  }, [dispatch])

  return newID ? <Redirect to={`/workout/${newID}`}/> : (
    <div css={`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    `}>
      Creating workout
    </div>
  )
}

export default App;
