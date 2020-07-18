import React, {useState} from 'react'
import { StyledNumberInput } from '../components'


const useNumberInput = (initialState = 0) => {
   const [value, setValue] = useState(initialState)
   
   return {
      value,
      setValue,
   }

}

export { useNumberInput }