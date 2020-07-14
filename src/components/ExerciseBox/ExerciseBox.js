import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as AddSVG } from '../../images/plus.svg'
import { Set } from '..'


const ExerciseBox = ({exercise}) => {
   return (
      <div css={`
         
         width: fit-content;
         margin: .75rem;

         border: 1px solid #525252;
         border-radius: 3px;
      `}>
         <header css={`
            display: flex;

            padding: .5rem 1rem;

            border-bottom: 1px solid #777;

            & > h3 {
               margin: 0;
            }
         `}>
            <h3>{exercise.name}</h3>
         </header>

         <div css={`
            display: flex;
            justify-content: space-between;

            padding: 0;

            &> div {
               display: flex;
               flex: 1;
               flex-flow: column nowrap;
               justify-content: center;
               align-items: center;
               padding: .5rem .75rem;

               font-size: 1.15rem;
            }

            &> div + div {
               border-left: 1px solid #ddd;
            }
         `}>

            {exercise.sets.map((set, index) => (<Set key={index} setNames={exercise.setNames} set={set}/>))}
            <div css={`
               padding: 0!important;
            `}>
               <button css={`
                  border: none;
                  background: transparent;
                  outline: none;
                  cursor: pointer;
                  height: 100%;
                  width: 100%;

                  &:hover {
                     background: #f2f2f2;
                  }
               `}>
                  <PlusIcon width="20px"/>
               </button>
            </div>
         </div>
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

const PlusIcon = styled(AddSVG)`

`

const TextInput = styled.input.attrs(props => ({
   type: "text",
   size: "10"
 }))`
   width: 100%;
   outline: none;
   border: none;
   background: #ddd;
   border-radius: 3px;
   padding: 5px;
   text-align: center;
 `

export default ExerciseBox
