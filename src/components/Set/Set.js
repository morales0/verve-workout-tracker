import React from 'react'
import styled from 'styled-components/macro'
import { SetNameInput } from '..'

const Set = ({setNames, set, updateSet}) => {
   return (
      <div className="set">
         {setNames.map((setName, index) => {
            return (
               <React.Fragment key={index}>
                  { index !== 0 && <SetSeparator/> }
                  <SetNameInput setInitialValue={set[setName]} setName={setName} updateSet={updateSet}/>
               </React.Fragment>
            )
         })}
      </div>
   )
}

// Styled UI components
const SetSeparator = styled.hr`
   width: 70%;
   margin: 0;
   margin-bottom: .4rem;
   border: none;
   border-top: 2px solid #ddd;
`

export default Set
