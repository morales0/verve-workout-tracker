import React from 'react'
import styled from 'styled-components/macro'
import { SetNameInput } from '../..'

const Set = ({wid, eid, setIndex, setNames, completed}) => {
   return (
      <div className="set">
         {setNames.map((setName, index) => {
            return (
               <React.Fragment key={index}>
                  { index !== 0 && <SetSeparator/> }
                  <SetNameInput wid={wid} eid={eid} setName={setName} index={setIndex} completed={completed}/>
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
