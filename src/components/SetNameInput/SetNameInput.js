import React from 'react'
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro'
import { useNumberInput } from '../../hooks'
import { StyledNumberInput } from '..'

/**
 * Handles a single input value inside a set container.
 * 
 * TODO:
 * Fix input to be only integers
 * Error on wrong input?
 * Add increment buttons?
 * 
 */
const SetNameInput = ({setInitialValue, setName, updateSet}) => {
   const {value, setValue} = useNumberInput(setInitialValue)

   return (
      <>
         <StyledNumberInput  
            value={value} 
            onChange={(e) => setValue(e.target.value > 999 ? ~~(e.target.value / 10) : e.target.value)}  
            onBlur={(e) => {
               console.log(updateSet)
               updateSet(setName, value)
            }}
         />
         <span css={`font-size: .9rem; padding: .3rem;`}>
            {setName}
         </span>
      </>
   )
}

export default SetNameInput
