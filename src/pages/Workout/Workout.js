import React, { useState, useEffect } from 'react'
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
         },
         {
            reps: 20
         }
      ]
   },
   {
      name: "Pullups",
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
         },
         {
            reps: 20
         }
      ]
   },
   {
      name: "Face Pulls",
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
         },
         {
            reps: 20
         }
      ]
   },
   {
      name: "Shoulder Press",
      setNames: ['weight', 'reps'],
      sets: [
         {
            weight: 45,
            reps: 12
         },
         {
            weight: 45,
            reps: 15
         },
         {
            weight: 45,
            reps: 15
         }
      ]
   }
]

const Workout = () => {
   const [exercises, setExercises] = useState(initial_exercises);
   useEffect(() => {
      console.log(exercises)      
   })

   // Actions
   const addSet = (index) => {
      const tempArr = [...exercises]
      const emptySet = {}
      tempArr[index].setNames.forEach((name) => {
         emptySet[name] = 0;
      })

      if (tempArr[index].sets){
         tempArr[index].sets.push(emptySet)
      } else {
         tempArr[index].sets = [emptySet]
      }
      
      setExercises(tempArr)
   }

   const removeSet = (index) => {
      const tempArr = [...exercises]

      tempArr[index].sets.pop();

      setExercises(tempArr)
   }

   const removeExercise = (index) => {
      const tempArr = [...exercises]
      tempArr.splice(index, 1)

      setExercises(tempArr)
   }

   const addExercise = () => {
      const tempArr = [...exercises]
      tempArr.unshift({
         name: "New Exercise",
         setNames: ['reps'],
         sets: []
      })

      setExercises(tempArr)
   }

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
               <Button onClick={addExercise}>
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
               {exercises.map((exercise, index) => (<ExerciseBox key={index} index={index} exercise={exercise} addSet={addSet} removeSet={removeSet} removeExercise={removeExercise}/>))}
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
