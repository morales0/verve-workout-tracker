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


const Workout = (props) => {
   const {wid} = useParams() // Get wid from url
   const [workout, exerciseTypes, addExercise, completeExercise, removeExercise, addSet, removeSet, updateSet, completeWorkout] = useWorkout(wid)

   console.log(workout);

   return !workout ? <Redirect to="/" /> : (
      <div className="workout_page">
         <Dropdown label="EXERCISES" grow={50} css={`
            position: absolute;
            right: 1.5rem;
            margin-top: .7rem;
            z-index: 50;
         `}>
            <ExerciseDropdownItem name="Custom" onClick={() => console.log("Custom")} />
            {exerciseTypes.map((type, index) => {
               console.log(type)
               return <ExerciseDropdownItem key={index} name={type.name} 
                        onClick={() => addExercise(type.name, type.setNames)} />
            })}
         </Dropdown>

         {
            Object.keys(workout.completedExercises).length !== 0 && Object.keys(workout.exercises).length === 0 ? null :
            <section className="exercises_section" css={`flex: 1`}>
               <header css={`background: ${props => props.theme.themeValue.mainBG}90;`}>
                  <h1>My Workout</h1>
               </header>
               <div className="exercises">
                  {Object.values(workout.exercises).map((exercise, index) => {
                     return (
                     <ExerciseBox 
                        key={exercise.eid} exercise={exercise}
                        removeExercise={removeExercise} completeExercise={completeExercise}
                        addSet={addSet} removeSet={removeSet}
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
            <section className="exercises_section">
               <header>
                  <h1>COMPLETED</h1>
               </header>
      
               <div className="exercises">
                  {Object.values(workout.completedExercises).map((exercise, index) => {
                     return (
                     <ExerciseBox 
                        key={exercise.eid} exercise={exercise}
                        removeExercise={removeExercise} completeExercise={completeExercise}
                        addSet={addSet} removeSet={removeSet}
                        updateSet={updateSet}
                     />
                     )
                  })}
               </div>

               <div className="complete_workout_footer">
                  <Link to="/">
                     <Button disabled={Object.keys(workout.exercises).length !== 0} size="small" bgColor="#a5dca5" onClick={() => completeWorkout()}>
                        COMPLETE WORKOUT
                     </Button>
                  </Link>
               </div>
               
            </section>
         }
      </div>
   )
}

export default Workout
