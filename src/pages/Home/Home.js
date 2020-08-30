import React from 'react'
import { useUser } from '../../context/user-context'
import styled from 'styled-components/macro'

import { Button, ToolBox } from '../../components'

const Home = () => {
   const {user} = useUser()

   return (
      <div css={`
         display: flex;
         flex-flow: column;
         align-items: center;
         height: 100%
      `}>
         <div css={`
            text-align: center;
            font-family: 'Merienda One', cursive;
            font-size: 1.35rem;
            color: #ff5f5f;
            margin: 2rem auto;
            padding: 0 .5rem;
         `}>
            <h1>Feel the Verve</h1>
         </div>
         <div css={`

            padding: 1rem 1.25rem;
         `}>
            <ToolBox>
               {
                  user.isWorkingOut ?
                  <ToolBox.Item heading="Continue Workout" href={`/workout/${user.currentWorkoutId}`}>
                     Finish your workout!
                  </ToolBox.Item>
                     :
                  <ToolBox.Item heading="New Workout" href="/workout/new">
                     Start a new workout here
                  </ToolBox.Item>
               }
               <ToolBox.Item heading="Workout History" href="/workouthistory">View your past workouts!</ToolBox.Item>
               {/* <ToolBox.Item heading="Exercises" href="/">See your collection of exercises and update them</ToolBox.Item> */}
            </ToolBox>
         </div>
      </div>
   )
}

export default Home