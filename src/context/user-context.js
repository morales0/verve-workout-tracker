import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './auth-context'

const UserContext = React.createContext()

const UserProvider = (props) => {
   const {data: user, dataDispatch: dispatch} = useAuth()
   console.log("User", user)

   return (
      <UserContext.Provider value={{user, dispatch}} {...props}>
         {props.children}
      </UserContext.Provider>
   )
}

/**
 * Gives access to the global user state.
 */
const useUser = () => {
   return useContext(UserContext)
}

export { UserProvider, useUser }