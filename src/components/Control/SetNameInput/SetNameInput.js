import React from 'react'
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro'
import { useNumberInput } from '../../../hooks'
import { StyledNumberInput } from '../..'
import { useSetName } from '../../../hooks/user-hooks'

/**
 * Handles a single input value inside a set container.
 * 
 * TODO:
 * Fix input to be only integers
 * Error on wrong input?
 * Add increment buttons?
 * 
 */
const SetNameInput = ({wid, eid, setName, index, completed}) => {
   const [value, updateValue] = useSetName(wid, eid, setName, index)

   return (
      <>
         <StyledNumberInput  
            value={value} 
            disabled={completed}
            onFocus={(e) => updateValue('')}
            onChange={(e) => updateValue(e.target.value > 999 ? ~~(e.target.value / 10) : e.target.value)}  
            onBlur={(e) => {
               updateValue(e.target.value)
            }}
         />
         <span css={`font-size: .9rem; padding: .3rem;`}>
            {setName}
         </span>
      </>
   )
}

export default SetNameInput
