import React, { useState, useEffect } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { useUser } from './context/user-context';

// Components
import { Main, GuestNavbar } from './components'

// Pages
import { Home, Workout, Gains, ViewComponents } from './pages';


// This app will use local storage for data
const UnauthenticatedApp = () => {
  const {user, authenticated, api} = useUser()

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

            <Route path="/workout/*">
              <GuestNavbar />
            </Route>

            <Route path="/gains">
              <GuestNavbar />
            </Route>

            <Route path="/viewcomponents">
              <GuestNavbar />
            </Route>

            <Route path="/" exact={true}>
              <GuestNavbar />
            </Route>

            <Route path="*">
              <h1>Not found!</h1>
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
              {
                user.isWorkingOut ? <Redirect to={`/workout/${user.currentWorkoutID}`} /> :
                <CreateWorkout />
              }
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
   )
}

// Create a new workout and redirect
const CreateWorkout = (props) =>{
  const [newID, setNewID] = useState(null)
  const userapi = useUser()

  useEffect(() => {
    const wid = uuidv4()
    userapi.set({type: 'createWorkout', wid: wid})

    setTimeout(() => setNewID(wid), 1000)
  }, [])

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

export default UnauthenticatedApp
