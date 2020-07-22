import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import './Workout.scss'

// DEV
import initial_state from '../../context/test_initial_data'

// Hooks and context
import { useWorkout } from '../../context/UserContext/UserContext'

// Components
import { Button, ExerciseBox } from '../../components'
import { useParams } from 'react-router-dom'


const Workout = (props) => {
   const {workout, addExercise, removeExercise, addSet, removeSet, updateSet} = useWorkout(props.wid)

   return (
      <div className="workout_page">
         <section className="exercises_section">
            <header css={` background: ${props => props.theme.themeValue.mainBG}90;`}>
               <h1>EXERCISES</h1>
               <Button onClick={() => addExercise()}>
                  New Exercise
               </Button>
            </header>
            <div>
               {Object.values(workout).map((exercise, index) => {
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
               {Object.values(workout).map((exercise, index) => {
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
