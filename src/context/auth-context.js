import React, { useState, useEffect, useContext } from 'react';
import ls from 'local-storage'
import { useGlobalState } from '../hooks/useGlobalState'

const newUser ={
   name: 'NEW USER',
   displayName: 'user',
   isWorkingOut: false,
   workouts: {}
}

const AuthContext = React.createContext();

const AuthProvider = (props) => {
   const [authenticating, setAuthenticating] = useState(true)
   const [data, dataDispatch] = useGlobalState()

   useEffect(() => {
      console.log('Render')
      ls('userData', data)
   }, [data])

   // Get local storage data for user
   // Eventually this will get the user details from firebase
   
   if(authenticating){
      const lsData = ls.get('userData')

      if (lsData) {
         dataDispatch({type: "SET_DATA", newState: lsData})
      } else {
         dataDispatch({type: "SET_DATA", newState: newUser})
         ls('userData', newUser)
      }

      setAuthenticating(false)
   }


	// code for pre-loading the user's information if we have their token in
   // localStorage goes here

   
	// 🚨 this is the important bit.
	// Normally your provider components render the context provider with a value.
	// But we post-pone rendering any of the children until after we've determined
	// whether or not we have a user token and if we do, then we render a spinner
   // while we go retrieve that user's information.
   
	if (authenticating) {
		return null;
   }
   
   // Authentication protocols
	const login = () => {
      console.log("User requested to login")
   }; // make a login request
	const register = () => {
      console.log("User requested to register")
   }; // register the user
	const logout = () => {
      console.log("User requested to log out")
   }; // clear the token in localStorage and the user data

   // Render children when authentication is finished
   return (
      <AuthContext.Provider value={{data, dataDispatch, login, logout, register}} {...props} />
   )
};

const useAuth = () => {
   return useContext(AuthContext)
}

export { useAuth, AuthProvider }
