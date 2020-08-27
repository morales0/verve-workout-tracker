import React, { useState } from 'react'
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
const SetNameInput = ({completed, setName, value, updateSetName}) => {
   const [inputVal, setInputVal] = useState(value)

   return (
      <>
         <StyledNumberInput disabled={completed}
            value={inputVal}
            onFocus={(e) => setInputVal('')}
            onChange={(e) => setInputVal(e.target.value > 999 ? ~~(e.target.value / 10) : e.target.value)}
            onBlur={(e) => updateSetName(e.target.value)}
         />
         <span css={`font-size: .9rem; padding: .3rem;`}>
            {setName}
         </span>
      </>
   )
}

export default SetNameInput
