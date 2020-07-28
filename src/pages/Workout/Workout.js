import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import './Workout.scss'
//import { devices } from '../../css/media'

// Hooks and context
import { useWorkout } from '../../hooks/user-hooks'
import { usePopUp } from '../../hooks/component-hooks'

// Components
import { Button, ExerciseBox } from '../../components'
import { useParams, Link } from 'react-router-dom'


const Workout = (props) => {
   const {wid} = useParams() // Get wid from url
   const [workout, addExercise, removeExercise, addSet, removeSet, updateSet, completeWorkout] = useWorkout(wid)

   return !workout ? null : (
      <div className="workout_page">
         <Dropdown label="EXERCISES" css={`
            position: absolute;
            right: 1.5rem;
            margin-top: .7rem;
            z-index: 50;
         `}>
            <Item>
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
            <Item>
               <div css={`
                  display: flex;
                  justify-content: space-between;
               `}>
                  <span>Body Squats</span>
                  <span>+</span>
               </div>
            </Item>
         </Dropdown>
         <section className="exercises_section" css={`flex: 1`}>
            <header css={` background: ${props => props.theme.themeValue.mainBG}90;`}>
               <h1>EXERCISES</h1>

               

               {/* <Button onClick={() => addExercise("New exercise")}>
                  New Exercise
               </Button> */}
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
               {
               Object.entries(workout.exercises).length === 0 ? <p css={`margin: auto`}>None completed yet</p>
               : Object.values(workout.exercises).map((exercise, index) => {
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

            <Link to="/">
               <Button onClick={() => completeWorkout()}>
                  Complete Workout
               </Button>
               </Link>
         </section>
      </div>
   )
}

const Dropdown = (props) => {
   const wrapperRef = useRef(null);
   const [open, setOpen] = usePopUp(wrapperRef);

   return (
      <div ref={wrapperRef} css={`
         position: absolute;
         right: 1.5rem;
         margin-top: .7rem;
         z-index: 50;
      `}>
         <Button css={`
            width: ${open ? '300px' : '150px'};

            @media only screen and (max-width: 500px) {
               width: 170px;
            }

            max-width: 45vw;
            background: ${props => props.theme.themeValue.offBG};
            border: none;
            box-shadow: 0 0 10px 0 #00000025;
            border-radius: 15px;
            padding: 1rem .75rem;
            /* font-size: 1.2rem; */
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
            outline: none;
            transition: width .5s;
            -webkit-tap-highlight-color: transparent;

            &: hover {
               background: ${props => props.theme.themeValue.offBG};
               cursor: pointer;
            }
         `} onClick={() => setOpen(!open)}>
            {props.label}
            <div css={`
               width: 0;
               height: 0;
               margin-left: .5rem;
               border-style: solid;
               border-width: 10px 10px 0 10px;
               border-color: #a9a9a9 transparent transparent transparent;
               transform: ${open ? 'rotate(-180deg)' : 'none'};
               transition: .5s;
            `}/>
         </Button>
            <div css={`
               position: absolute;
               max-height: 400px;
               opacity: ${open ? '1' : '0'};
               visibility: ${open ? 'visible' : 'hidden'};
               right: 0;
               top: 5px;
               z-index: -1;
               padding-top: ${open ? '50px' : '0'};
               min-width: 100%;
               background: #fafbfc;
               border-radius: 7px;
               border-top-left-radius: 15px;
               border-top-right-radius: 15px;
               box-shadow: 0 0 5px 0 #00000033;
               overflow: auto;
               transition: .5s;

               &> div + div {
                  border-top: 1px solid #d0d0d0;
               }
            `}>
               {props.children}
            </div>
      </div>
      
   )
}

const Item = (props) => {
   return (
      <div css={`
         cursor: pointer;
         color: #424242;

         &> * {
            padding: 1rem;
            background: transparent;
            width: 100%;
            font-size: 1rem;
         }

         &:hover {
            ${isMobile ? '' : 'background-color: #eee;'}
         }
      `}>
         {props.children}
      </div>
   )
}

export default Workout
