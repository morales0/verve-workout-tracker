import React, { useState } from 'react'
import styled from 'styled-components/macro'

// Components
import { Button, ExerciseBox } from '../../components'

// Mock initial state

const initial_exercises = [
   {
      name: "Pushups",
      setNames: ['reps'],
      sets: [
         {
            reps: 10
         },
         {
            reps: 15
         },
         {
            reps: 15
         }
      ]
   },
   {
      name: "Shoulder Press",
      setNames: ['weight', 'reps'],
      sets: [
         {
            weight: "45lbs",
            reps: 12
         },
         {
            weight: "45lbs",
            reps: 15
         },
         {
            weight: "45lbs",
            reps: 15
         }
      ]
   }
]

const Workout = () => {
   const [exercises, setExercises] = useState(initial_exercises);

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
            <h2>Exercises</h2>
            <div css={`
               display: flex;
               flex-flow: row wrap;

               padding: .5rem 1rem;
            `}>
               {exercises.map((exercise, index) => (<ExerciseBox key={index} exercise={exercise} />)) }
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
