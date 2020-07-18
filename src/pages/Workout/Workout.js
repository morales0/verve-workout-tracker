import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import './Workout.scss'

// DEV
import initial_state from '../../context/test_initial_data'

// Hooks and context
import { useWorkout } from '../../context/UserContext/UserContext'

// Components
import { Button, ExerciseBox } from '../../components'


const Workout = () => {
   const {state, addExercise, removeExercise, addSet, removeSet, updateSet} = useWorkout(initial_state);

   console.log(state)

   return (
      <div className="workout_page">
         <section className="exercises_section">
            <header>
               <h1>EXERCISES</h1>
               <Button onClick={() => addExercise()}>
                  New Exercise
               </Button>
            </header>
            <div>
               {Object.values(state).map((exercise, index) => {
                  return (
                  <ExerciseBox 
                     key={index} exercise={exercise}
                     removeExercise={removeExercise}
                     addSet={addSet} removeSet={removeSet}
                     updateSet={updateSet}
                  />
                  )
               })}
            </div>
         </section>

         <section className="exercises_section">
            <header>
               <h1>COMPLETED</h1>
            </header>
   
            <div>
               {/* <p css={`margin: auto`}>None completed yet</p> */}
               {Object.values(state).map((exercise, index) => {
                  return (
                  <ExerciseBox 
                     key={index} exercise={exercise}
                     removeExercise={removeExercise}
                     addSet={addSet} removeSet={removeSet}
                     updateSet={updateSet}
                  />
                  )
               })}
            </div>
         </section>
      </div>
   )
}

export default Workout
