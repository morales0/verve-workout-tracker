import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import './Workout.scss'
//import { devices } from '../../css/media'

// Hooks and context
import { useWorkout } from '../../hooks/user-hooks'
import { usePopUp } from '../../hooks/component-hooks'

// Components
import { Button, ExerciseBox, Dropdown, Item, ExerciseDropdownItem } from '../../components'
import { useParams, Link, Redirect } from 'react-router-dom'
import CreateExerciseWidget from '../../components/Control/CreateExerciseWidget/CreateExerciseWidget'


const Workout = (props) => {
   const {wid} = useParams() // Get wid from url
   const [workout, exerciseTypes, addExercise, completeExercise, unCompleteExercise, removeExercise, addSet, removeSet, updateSet, completeWorkout] = useWorkout(wid)
   const [creating, setCreating] = useState(false)

   console.log(workout);

   return !workout ? <Redirect to="/" /> : (
      <div className="workout_page" css={`
         &> section:first-of-type {
            flex: 1;
         }
      `}>
         <div css={`
            display: ${creating ? 'block' : 'none'};
            position: absolute;
            z-index: 200;
            height: 100vh;
            width: 100%;
            padding-top: 20px;
         `}>
            <CreateExerciseWidget onSubmit={() => setCreating(false)} css={`
               margin: auto;
            `}/>

         </div>
         
         <Dropdown label="EXERCISES" grow={50} css={`
            position: absolute;
            right: 1.5rem;
            margin-top: .7rem;
            z-index: 90;
         `}>
            <ExerciseDropdownItem name="Custom" onClick={() => setCreating(true)} />
            {exerciseTypes.map((type, index) => {
               console.log(type)
               return <ExerciseDropdownItem key={index} name={type.name} 
                        onClick={() => addExercise(type.name, type.setNames)} />
            })}
         </Dropdown>

         {
            Object.keys(workout.completedExercises).length !== 0 && Object.keys(workout.exercises).length === 0 ? null :
            <section className="exercises_section" >
               <header css={`
                  color: #3c4646;
                  background: #daedfd8f;
                  border-bottom: 1px solid #b3b3b3;
               `}>
                  <h1 css={`font-variant: petite-caps;`}>Workout</h1>
               </header>
               <div className="exercises">
                  {Object.values(workout.exercises).map((exercise, index) => {
                     return (
                     <ExerciseBox 
                        key={exercise.eid} wid={wid} exercise={exercise}
                        removeExercise={removeExercise} completeExercise={completeExercise}
                        unCompleteExercise={unCompleteExercise} addSet={addSet} removeSet={removeSet}
                        updateSet={updateSet}
                     />
                     )
                  })}
               </div>
            </section>
         }
         {
            // Only show the completed section if the user has actually completed exercises
            Object.keys(workout.completedExercises).length === 0 ? null :
            <section className="exercises_section" >
               <header css={`
                  color: #3c4646;
                  background: #d5f7dc8f;
                  border-bottom: 1px solid #b3b3b3;
               `}>
                  <h1 css={`font-variant: petite-caps;`}>Completed</h1>
               </header>
      
               <div className="exercises">
                  {Object.values(workout.completedExercises).map((exercise, index) => {
                     return (
                     <ExerciseBox 
                        key={exercise.eid} wid={wid} exercise={exercise}
                        completed={true} removeExercise={removeExercise} completeExercise={completeExercise}
                        addSet={addSet} removeSet={removeSet} unCompleteExercise={unCompleteExercise}
                        updateSet={updateSet}
                     />
                     )
                  })}
               </div>

               
               
            </section>
         }
         <div className="complete_workout_footer">
            <Link to="/">
               <Button disabled={Object.keys(workout.exercises).length !== 0 || Object.keys(workout.completedExercises).length === 0}
                  size="small" bgColor="#a5dca5" onClick={() => completeWorkout()}>
                  COMPLETE WORKOUT
               </Button>
            </Link>
         </div>
      </div>
   )
}

export default Workout
