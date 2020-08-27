import React, {useContext, useState} from 'react'
import styled, {ThemeContext} from 'styled-components/macro'
import { useExercise } from '../../../hooks/user-hooks'

import { ReactComponent as AddSVG } from '../../../images/plus.svg'
import { ReactComponent as MinusSVG } from '../../../images/minus.svg'
import { ReactComponent as MoreSVG } from '../../../images/3_dots.svg'
import { Set } from '../..'
import { Button } from '../..'

const ExerciseBox = ({completed, exercise, exerciseapi}) => {
   const [settings, setSettings] = useState(false)

   return (
      <div className="exercise_box_container">
         {
            settings && 
            <ExerciseControl 
               completed={exercise.completed}
               remove={() => exerciseapi.removeExerciseFromWorkout(exercise.eid)} 
               complete={() => exerciseapi.completeExercise(exercise.eid)}
               edit={() => exerciseapi.uncompleteExercise(exercise.eid)}
            />
         }

         <header>
            <h3>{exercise.name}</h3>
            <div>
               <span>{exercise.sets ? exercise.sets.length : 0}</span>
               <Button className="more_toggle" onClick={() => setSettings(!settings)}>
                  <MoreIcon width="25px"/>
               </Button>   
            </div>
         </header>

         <div className="exercise_box_content" css={`background: ${props => props.theme.themeValue.offBG};`}>
            <div className="sets_container">
               {
                  (exercise.sets && exercise.sets.length > 0) ?
                     exercise.sets.map((set, index) => (
                        <Set completed={completed}
                           key={index} 
                           setNames={exercise.setNames}
                           setIndex={index}
                           set={set}
                           updateSetName={exerciseapi.updateSetName(exercise.eid)}
                        />
                     ))
                  :
                     <h4 css={`font-weight: normal; margin: auto`}>
                        No sets!
                     </h4>
               }
            </div>
            {
               !exercise.completed &&
               <div className="sets_control">
                  <button onClick={() => exerciseapi.addSetToExercise(exercise.eid)}>
                     <PlusIcon width="20px"/>
                  </button>
                  <button onClick={() => exerciseapi.removeSetFromExercise(exercise.eid)}>
                     <MinusIcon width="20px"/>
                  </button>
               </div>
            }
         </div>
      </div>
   )
}

// Styled UI components
const ExerciseControl = (props) => {
   return (
      <div css={`
         position: absolute;
         right: 40px;

         display: flex;
         flex-flow: column;
         max-height: 100%;
         min-width: 150px;

         color: #323b3b;
         border: 1px solid #9a9a9a;
         border-radius: 4px;
         background: #fefefe;

         overflow: hidden;

         & > button {
            flex: 1;
            margin: 0;
            padding: .5rem .5rem;
            /* width: 100%; */
            background: transparent;
            outline: none;
            border: none;
            border-radius: 0;
            appearance: none;
            text-align: center;
            cursor: pointer;

            &:hover {
               /* filter: brightness(.9); */
            }
         }

       & > button.remove_exercise {
          &:hover{
            background: #ffc6c4;
          }
         }

         & > button.complete_exercise {
            &:hover{
               background: #c9ffd7;
            }
         }

         & > button + button {
            border-top: 1px solid #a9a9a9;
         }
      `}>
         { 
            props.completed ? (
               <button className="remove_exercise" onClick={props.edit}>Edit</button>
            ):<>
               <button className="remove_exercise" onClick={props.remove}>Remove</button>
               <button className="complete_exercise" onClick={props.complete}>Complete</button>
            </>
         }
         
      </div>
   )
}

const PlusIcon = styled(AddSVG)`

`

const MinusIcon = styled(MinusSVG)`

`

const MoreIcon = styled(MoreSVG)``

export default ExerciseBox
