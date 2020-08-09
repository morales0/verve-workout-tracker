import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import './Workout.scss'
//import { devices } from '../../css/media'

// Hooks and context
import { useWorkout } from '../../hooks/user-hooks'
import { usePopUp } from '../../hooks/component-hooks'

// Components
import { Button, ExerciseBox, Dropdown, Item } from '../../components'
import { useParams, Link, Redirect } from 'react-router-dom'


const Workout = (props) => {
   const {wid} = useParams() // Get wid from url
   const [workout, addExercise, removeExercise, addSet, removeSet, updateSet, completeWorkout] = useWorkout(wid)

   return !workout ? <Redirect to="/" /> : (
      <div className="workout_page">
         <Dropdown label="EXERCISES" grow={50} css={`
            position: absolute;
            right: 1.5rem;
            margin-top: .7rem;
            z-index: 50;
         `}>
            <Item name="Pushups">
               <button onClick={() => addExercise("Pushups")} css={`
                  display: flex;
                  justify-content: space-between;
                  
                  cursor: pointer;
                  font-family: inherit;
                  color: inherit;
                  border: none;
                  outline: none;
               `}>
                  <span>Pushups</span>
                  <span>+</span>
               </button>
            </Item>
            <Item name="Body Squats">
               <div css={`
                  display: flex;
                  justify-content: space-between;
               `}>
                  <span>Body Squats</span>
                  <span>+</span>
               </div>
            </Item>
            <Item name="Custom">
            <div css={`
                  display: flex;
                  justify-content: space-between;
               `}>
                  <span>Custom</span>
                  <span>+</span>
               </div>
            </Item>
         </Dropdown>

         <section className="exercises_section" css={`flex: 1`}>
            <header css={`background: ${props => props.theme.themeValue.mainBG}90;`}>
               <h1>EXERCISES</h1>
            </header>
            <div>
               {Object.values(workout.exercises).map((exercise, index) => {
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
               None completed yet
            </div>

            <Link to="/">
               <Button onClick={() => completeWorkout()}>
                  Complete Workout
               </Button>
               </Link>
         </section>
      </div>
   )
}

export default Workout
