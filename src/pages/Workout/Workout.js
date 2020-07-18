import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

// DEV
import initial_state from '../../context/test_initial_data'

// Hooks and context
import { useWorkout } from '../../context/UserContext/UserContext'

// Components
import { Button, ExerciseBox } from '../../components'


const Workout = () => {
   const {state, addExercise, removeExercise, addSet, removeSet, updateSet} = useWorkout(initial_state);

   return (
      <div css={`
         display: flex;
         flex-flow: column;
         height: 100%;
         font-family: 'Montserrat', sans-serif;
      `}>
         <div css={`
            flex: 1;
         `}>
            <header css={`
               display: flex;
               justify-content: space-between;
               align-items: center;
               padding: .25rem 2rem;

               & > h1 {
                  margin: 1rem 0;
               }
            `}>
               <h1>Exercises</h1>
               <Button onClick={() => addExercise()}>
                  New Exercise
               </Button>
            </header>
            <div css={`
               display: flex;
               flex-flow: row wrap;
               align-items: flex-start;

               /* display: grid;
               grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
               gap: 1rem; */

               padding: .5rem 1rem;
            `}>
               {Object.values(state).map((exercise, index) => {
                  console.log("EXERCISE: ", exercise)

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
         </div>

         <div>
            <h2>Completed</h2>
            <div>
               <p>None completed yet</p>
            </div>
         </div>
      </div>
   )
}

export default Workout
