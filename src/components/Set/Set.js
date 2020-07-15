import React from 'react'
import styled from 'styled-components/macro'

const Set = ({setNames, set}) => {
   return (
      <div>
         {setNames.map((setName, index) => {
            console.log(setName, set[setName])
            return (
               <>
               {index !== 0 && 
                  <SetSeparator key={index}/>
               }
               <NumberInput key={index + 1} value={set[setName]} />
               <span key={index + 2} css={`
                  font-size: .9rem;
                  padding: .3rem;
               `}>
                  {setName}
               </span>
               </>
            )
         })}
      </div>
   )
}

// Styled UI components

const SetSeparator = styled.hr`
   width: 90%;
   margin: 0;
   margin-bottom: .4rem;
   border: none;
   border-top: 2px solid #ddd;
`

const NumberInput = styled.input.attrs(props => ({
   type: "number",
}))`
   max-width: 3rem;
   outline: none;
   border: none;
   background: #e4e4e4;
   border-radius: 3px;
   padding: 5px;
   text-align: center;
   font-family: inherit;
   font-size: 1.15rem;
`

export default Set
