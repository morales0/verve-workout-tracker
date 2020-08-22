import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

// Components
import { Main } from './components'

// Pages
import { Workout } from './pages'


// This app will use local storage for data
const UnauthenticatedApp = () => {
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

export default UnauthenticatedApp
