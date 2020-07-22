import React, { useContext } from 'react'

const LocalStorageContext = React.createContext()

const LocalStorageProvider = (props) => {

   
   return <LocalStorageContext.Provider value={{}} {...props} />
}

const useLocalStorage = () => useContext(LocalStorageContext)

export { LocalStorageProvider, useLocalStorage }