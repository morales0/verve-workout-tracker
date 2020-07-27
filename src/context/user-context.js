import React, { useContext } from 'react'
import { useAuth } from './auth-context'

const UserContext = React.createContext()

const UserProvider = (props) => {
   const {data: user, dataDispatch: dispatch} = useAuth()

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