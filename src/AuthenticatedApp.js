import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserNavbar, Main } from './components';

// Pages
import { Home, Workout, Gains, ViewComponents } from './pages';
import { useUser } from './context/user-context';

const AuthenticatedApp = () => {
	const { user, authenticated, subscribe, set } = useUser();

	return (
		<Router>
			{/* Route a header depending on path here */}
			<header>
				<Switch>
					<Route path="/workout/*">
						<UserNavbar user={user} />
					</Route>

					<Route path="/gains">
						<UserNavbar user={user} />
					</Route>

					<Route path="/viewcomponents">
						<UserNavbar user={user} />
					</Route>

					<Route path="/" exact={true}>
						<UserNavbar user={user} />
					</Route>

					<Route path="*">
						<h1>Not found header</h1>
					</Route>
				</Switch>
			</header>

			{/* Route the path's body here */}
			<Main>
				<Switch>
					{/* Redirect authentication pages to home page */}
					<Route path="/login">
						<Redirect to="/" />
					</Route>

					<Route path="/signup">
						<Redirect to="/" />
					</Route>

					{/* Handle user pages */}
					<Route path="/" exact={true}>
						<Home />
					</Route>

					<Route path="/workout/new">
						{user.isWorkingOut ? <Redirect to={`/workout/${user.currentWorkoutId}`} /> : <CreateWorkout />}
					</Route>

					<Route path="/workout/:wid">
						<Workout />
					</Route>

					<Route path="/workout" exact={true}>
						{user.isWorkingOut ? <Redirect to={`/workout/${user.currentWorkoutId}`} /> : <Redirect to="/" />}
					</Route>

					<Route path="/gains">
						<Gains />
					</Route>

					<Route path="/viewcomponents">
						<ViewComponents />
					</Route>

					{/* Catch all */}
					<Route path="*">
						<h1>Not found</h1>
					</Route>
				</Switch>
			</Main>
		</Router>
	);
};

// Create a new workout and redirect
const CreateWorkout = (props) => {
	const [ newID, setNewID ] = useState(null);
	const userapi = useUser();

	useEffect(() => {
      const wid = userapi.set({type: 'createWorkout'})
      setTimeout(() => setNewID(wid), 1000);
   }, []);

	return newID ? (
		<Redirect to={`/workout/${newID}`} />
	) : (
		<div
			css={`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    `}
		>
			Creating workout
		</div>
	);
};

export default AuthenticatedApp;
