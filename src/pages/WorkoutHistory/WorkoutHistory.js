import React from 'react'

import './WorkoutHistory.scss'
import { useUser } from '../../context/user-context'
import { Link } from 'react-router-dom';

const WorkoutHistory = () => {
   const {user, dispatch} = useUser();

   return (
      <div className="workout_history_page">
         <header>
            <h2>My Workouts</h2>
         </header>
         <hr className="divider"/> 
         <div className="workouts_container">
            {Object.values(user.workouts).map((workout, index) => {
               return <PastWorkoutTile key={index} wid={workout.wid} date={workout.dateStartedString} exercises={workout.exercises}/>
            })}
         </div>
      </div>
   )
}

const PastWorkoutTile = (props) => {
   return (
      <Link className="past_workout_link" to={`/workout/${props.wid}`}>
         <div className="past_workout_tile">
            <section className="past_workout_sets_container">
               {Object.values(props.exercises).map((exercise, index) => {
                  return (
                     <div className="exercise_summary">
                        <header>
                           <h5 key={index}>{exercise.name}</h5>
                        </header>
                        
                        <div className="sets_list">
                           {Object.values(exercise.sets).map((set, index) => 
                              <div className="set_box">
                                 {Object.values(exercise.setNames).map((setName, index) => {
                                    return (
                                       <div className="set_name_box">
                                          <span>{set[setName]}</span>
                                          <span>{setName}</span>
                                       </div>
                                    )
                                 })}
                              </div>
                           )}
                        </div>
                     </div>
                  )
               })}
            </section>
            <h3>{props.date}</h3>
         </div>
      </Link>
   )
}

export default WorkoutHistory
