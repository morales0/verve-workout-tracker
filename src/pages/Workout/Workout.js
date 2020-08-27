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
   const [workout, meta, exerciseTypes, workoutapi] = useWorkout(wid)
   const [creating, setCreating] = useState(false)

   return !workout ? <div>Setting up</div> : (
      <div className="workout_page">
         {/* Custom exercise widget */}
         {/* <div css={`
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

         </div> */}
         
         {/** Exercise select
            TODO: 
            Remove exercise from dropdown once chosen
         */}
         <Dropdown label="EXERCISES" grow={50} className="workout_exercises_dropdown">
            {/* <ExerciseDropdownItem name="Custom" onClick={() => setCreating(true)} /> */}
            {exerciseTypes.map((type) => {
               return <ExerciseDropdownItem key={type.name} name={type.name} 
                        onClick={() => workoutapi.addExerciseToWorkout(type.name, type.setNames)} />
            })}
         </Dropdown>

         {
            // Only show if there are exercises available or if the workout is all empty
            (meta.totalExercises === 0 || meta.uncompletedExercises !== 0) &&
            <section className="exercises_section" >
               <header css={`background: #daedfd8f;`}>
                  <h1>Workout</h1>
               </header>
               <div className="exercises">
                  {Object.values(workout.exercises).map((exercise, index) => {
                     console.log("set names", exerciseTypes)
                     
                     return !exercise.completed && 
                        <ExerciseBox 
                           key={exercise.eid} 
                           exercise={exercise} 
                           exerciseapi={workoutapi.exerciseapi}
                        />
                  })}
               </div>
            </section>
         }
         {
            // Only show the completed section if the user has actually completed exercises
            meta.completedExercises !== 0 &&
            <section className="exercises_section" >
               <header css={`background: #d5f7dc8f;`}>
                  <h1>Completed</h1>
               </header>
      
               <div className="exercises">
                  {Object.values(workout.exercises).map(exercise => {
                     return exercise.completed && 
                        <ExerciseBox completed
                           key={exercise.eid} 
                           exercise={exercise}
                           exerciseapi={workoutapi.exerciseapi} 
                        />
                  })}
               </div>
            </section>
         }

         <div className="complete_workout_footer">
            <Link to="/">
               <Button disabled={meta.uncompletedExercises !== 0 || meta.totalExercises === 0} 
                  size="small" 
                  bgColor="#a5dca5" 
                  onClick={() => workoutapi.completeWorkout()}
               >
                  COMPLETE WORKOUT
               </Button>
            </Link>
         </div>
      </div>
   )
}

export default Workout
