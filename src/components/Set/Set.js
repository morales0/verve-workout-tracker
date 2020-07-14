import React from 'react'
import styled from 'styled-components/macro'

const Set = ({setNames, set}) => {
   return (
      <div>
         {setNames.map((setName, index) => {
            console.log(index)
            return (
               <>
               {index !== 0 && 
                  <SetSeparator />
               }
               <TextInput defaultValue={set[setName]} />
               <span css={`
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
   margin: .25rem 0;
   border: none;
   border-top: 2px solid #ddd;
`

const TextInput = styled.input.attrs(props => ({
   type: "text",
   size: "10",
 }))`
   width: 100%;
   outline: none;
   border: none;
   background: #ddd;
   border-radius: 3px;
   padding: 5px;
   text-align: center;
   font-family: inherit;
   font-size: 1.15rem;
 `

export default Set
