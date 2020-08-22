import React, { useState, useEffect, useContext } from 'react';
import ls from 'local-storage'
import {UserProvider} from './user-context'
import { useGlobalState } from '../hooks/useGlobalState'

const newUser ={
   name: 'Verver',
   displayName: 'V',
   isWorkingOut: false,
   currentWorkoutID: null,
   exerciseTypes: [
      {
         name: 'Pushups',
         setNames: ['reps']
      },
      {
         name: 'Pullups',
         setNames: ['reps']
      },
      {
         name: 'Bench Press',
         setNames: ['weight', 'reps']
      },
      {
         name: 'Shoulder Press',
         setNames: ['weight', 'reps']
      },
      {
         name: 'Body Squats',
         setNames: ['reps'],
      },
      {
         name: 'Dumbell Squats',
         setNames: ['weight', 'reps']
      }
   ],
   workouts: {}
}

const AuthContext = React.createContext();

const AuthProvider = ({children, auth, db}) => {
   const [authenticating, setAuthenticating] = useState(true)
   const [authenticated, setAuthenticated] = useState(false)
   const [user, setUser] = useState(null)
   const [data, dataDispatch] = useGlobalState()

   useEffect(() => {
      console.log('Render')
      ls('userData', data)
   }, [data])

   // Subscribe to authentication changes
   useEffect(() => {
      auth.onAuthStateChanged(authUser => {
         console.log("Auth change.", authUser);

         if (authUser) {
            setUser(authUser)
            setAuthenticated(true)
         } else {
            const lsData = ls.get('userData')

            if (lsData) {
               dataDispatch({type: "SET_DATA", newState: lsData})
            } else {
               dataDispatch({type: "SET_DATA", newState: newUser})
               ls('userData', newUser)
            }
         }

         setAuthenticating(false);
       });
   })

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
	const login = (email, password) => {
      auth().signInWithEmailAndPassword(email, password)
         .catch((error) => {
            console.log(error.code, error.message)
       });
   };

	const register = (email, password) => {
      auth().createUserWithEmailAndPassword(email, password)
         .then((user) => {
            // Create user
            db.ref('users/' + user.user.uid).set({
               uid: user.user.uid,
               email: email,
            });
         })
         .catch((error) => {
            console.log(error.code, error.message)
         })
   };

	const logout = () => {
      auth.signOut()
   }; 

   // Render children when authentication is finished
   return (
      <AuthContext.Provider value={{authenticated, login, logout, register}}>
         <UserProvider user={user} authenticated={authenticated} db={db}>
            {children}
         </UserProvider>
      </AuthContext.Provider>
   )
};

const useAuth = () => {
   return useContext(AuthContext)
}

export { AuthProvider, useAuth }
