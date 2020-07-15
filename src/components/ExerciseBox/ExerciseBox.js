import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as AddSVG } from '../../images/plus.svg'
import { ReactComponent as MinusSVG } from '../../images/minus.svg'
import { Set } from '..'
import { Button } from '../index'


const ExerciseBox = ({index, exercise, addSet, removeSet, removeExercise}) => {
   console.log(index, exercise);
   return (
      <div css={`
         min-width: 100px;
         max-width: 550px;
         flex: 1 1 460px;
         border: 1px solid #828282;
         border-radius: 5px;
         overflow: hidden;
         margin: .75rem;
      `}>
         <header css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .5rem .3rem .5rem 1rem;

            background: rgb(215, 246, 255);
            border-bottom: 1px solid #777;

            & > h3 {
               margin: 0;
            }
         `}>
            <h3>{exercise.name}</h3>
            <div>
               <span>{exercise.sets.length}</span>
               <Button css={`
                  margin-left: 5px;
                  border: none;
                  padding: 2px .25rem 0 .25rem;
                  outline: none;
                  background: #ff8484;

                  &:hover {
                     background: #ff8484;
                  }

               `} onClick={() => removeExercise(index)} ><MinusIcon width="15px"/></Button>
            </div>
         </header>

         <div css={`
            display: flex;
            justify-content: space-between;

            padding: 0;
            background: #fff;
         `}>
            <div css={`
               display: flex;
               justify-content: center;
               align-items: stretch;
               flex-flow: row nowrap;
               flex: 1;
               overflow-x: auto;

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
               {exercise.sets.length > 0 ?
                  exercise.sets.map((set, index) => (<Set key={index} setNames={exercise.setNames} set={set}/>))
               :
                  <h4 css={`
                     font-weight: normal;
                  `}>No sets!</h4>
               }
            </div>
            <div css={`
               display: flex;
               flex-flow: column;
               padding: 0!important;
               border-left: 1px solid #aaa;
            `}>
               <button css={`
                  border: none;
                  background: transparent;
                  outline: none;
                  cursor: pointer;
                  height: 100%;
                  width: 100%;
                  padding: .25rem;
                  border-bottom: 1px solid #ddd;

                  &:hover {
                     background: #f2f2f2;
                  }
               `} onClick={() => addSet(index)}>
                  <PlusIcon width="20px"/>
               </button>
               <button css={`
                  border: none;
                  background: transparent;
                  outline: none;
                  cursor: pointer;
                  height: 100%;
                  width: 100%;
                  padding: .25rem;

                  &:hover {
                     background: #f2f2f2;
                  }
               `} onClick={() => removeSet(index)}>
                  <MinusIcon width="20px"/>
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

const MinusIcon = styled(MinusSVG)`

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
