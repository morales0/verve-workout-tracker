import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/macro'

import { ReactComponent as AddSVG } from '../../images/plus.svg'
import { ReactComponent as MinusSVG } from '../../images/minus.svg'
import { Set } from '..'
import { Button } from '../index'

const ExerciseBox = ({exercise, removeExercise, addSet, removeSet, updateSet}) => {

   return (
      <div className="exercise_box_container">
         <header className="exercise_box_header">
            <h3>{exercise.name}</h3>
            <div>
               <span>{exercise.sets.length}</span>
               <Button onClick={() => removeExercise(exercise.eid)}>
                  <MinusIcon width="15px"/>
               </Button>
            </div>
         </header>
         <div className="exercise_box_content" css={`background: ${props => props.theme.themeValue.offBG};`}>
            <div className="sets_container">
               {exercise.sets.length > 0 ?
                  exercise.sets.map((set, index) => (
                     <Set 
                        key={index} 
                        setNames={exercise.setNames} 
                        set={set} 
                        updateSet={updateSet(exercise.eid, index)}
                     />
                  ))
               :
                  <h4 css={`font-weight: normal; margin: auto`}>
                     No sets!
                  </h4>
               }
            </div>
            <div className="sets_control">
               <button onClick={() => addSet(exercise.eid)}>
                  <PlusIcon width="20px"/>
               </button>
               <button onClick={() => removeSet(exercise.eid)}>
                  <MinusIcon width="20px"/>
               </button>
            </div>
         </div>
      </div>
   )
}

// Styled UI components

const PlusIcon = styled(AddSVG)`

`

const MinusIcon = styled(MinusSVG)`

`

export default ExerciseBox
