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
   const [workout, meta, exerciseTypes, addExercise, completeWorkout] = useWorkout(wid)
   const [creating, setCreating] = useState(false)

   return !workout ? <Redirect to="/" /> : (
      <div className="workout_page">
         {/* Custom exercise widget */}
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
         
         {/** Exercise select
            TODO: 
            Remove exercise from dropdown once chosen
         */}
         <Dropdown label="EXERCISES" grow={50} css={`
            position: absolute;
            right: 1.5rem;
            margin-top: .7rem;
            z-index: 90;
         `}>
            <ExerciseDropdownItem name="Custom" onClick={() => setCreating(true)} />
            {exerciseTypes.map((type, index) => {
               return <ExerciseDropdownItem key={index} name={type.name} 
                        onClick={() => addExercise(type.name, type.setNames)} />
            })}
         </Dropdown>

         {
            // Only show if there are exercises available or if the workout is all empty
            (meta.totalExercises === 0 || meta.uncompletedExercises !== 0) &&
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
                     return !exercise.completed && <ExerciseBox key={exercise.eid} wid={wid} exercise={exercise} />
                  })}
               </div>
            </section>
         }
         {
            // Only show the completed section if the user has actually completed exercises
            meta.completedExercises !== 0 &&
            <section className="exercises_section" >
               <header css={`
                  color: #3c4646;
                  background: #d5f7dc8f;
                  border-bottom: 1px solid #b3b3b3;
               `}>
                  <h1 css={`font-variant: petite-caps;`}>Completed</h1>
               </header>
      
               <div className="exercises">
                  {Object.values(workout.exercises).map(exercise => {
                     return exercise.completed && <ExerciseBox key={exercise.eid} wid={wid} exercise={exercise} />
                  })}
               </div>
            </section>
         }
         <div className="complete_workout_footer">
            <Link to="/">
               <Button disabled={meta.uncompletedExercises !== 0 || meta.totalExercises === 0} 
                  size="small" 
                  bgColor="#a5dca5" 
                  onClick={() => completeWorkout()}
               >
                  COMPLETE WORKOUT
               </Button>
            </Link>
         </div>
      </div>
   )
}

export default Workout
