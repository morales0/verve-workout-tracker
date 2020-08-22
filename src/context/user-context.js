import React, { useContext } from 'react'
import { useAuth } from './auth-context'

const UserContext = React.createContext()

const UserProvider = ({children, user, authenticated, db}) => {
   const api = {}

   if (authenticated)

   return (
      <UserContext.Provider value={{user, authenticated, api}} />
   )
}

/**
 * Gives access to the global user state.
 */
const useUser = () => {
   return useContext(UserContext)
}

export { UserProvider, useUser }