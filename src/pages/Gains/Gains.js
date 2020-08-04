import React from 'react'

import './Gains.scss'
import { useUser } from '../../context/user-context'

const Gains = () => {
   const {user, dispatch} = useUser();

   return (
      <div className="gains_page">
         <header>
            <h2>My Gains</h2>
         </header>
         <hr className="divider"/> 
         <div className="gains_tiles_container">
            {Object.values(user.workouts).map((workout, index) => {
               return <PastWorkoutTile key={index} date={workout.dateStarted} exercises={workout.exercises}/>
            })}
         </div>
      </div>
   )
}

const PastWorkoutTile = (props) => {
   return (
      <div className="past_workout_tile">
         <section>
            {Object.values(props.exercises).map((exercise, index) => {
               return <p key={index}>{exercise.name}</p>
            })}
         </section>
         <h3>{props.date}</h3>
      </div>
   )
}

export default Gains
