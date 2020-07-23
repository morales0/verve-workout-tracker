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
                  <ToolBox.Item heading="Continue Workout" href={`/workout/${user.currentWorkoutID}`}>
                     Finish your workout!
                  </ToolBox.Item>
                     :
                  <ToolBox.Item heading="New Workout" href={`/workout`} params={() => 'new-id'}>
                     Start a new workout here
                  </ToolBox.Item>
               }
               <ToolBox.Item heading="Gains" href="/gains">Analyze your amazing gains!</ToolBox.Item>
            </ToolBox>
         </div>
      </div>
   )
}

const NewWorkoutLink = (props) => {

   return (
      <ToolBox.Item heading="New Workout" href={`/workout/new`}>
         Start a new workout here
      </ToolBox.Item>
   )
}

export default Home



/* <div css={`
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;

         height: 100%;
      `}>
         <div css={`
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            width: 100%;
            background: #ffcaca;

         `}>
             <h2>Get your Verve on</h2> 
         </div>
         <div css={`
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 4;
            padding: 1.25rem 1rem;
            width: 100%;
         `}>
            <ToolBox>
               <ToolBox.Item heading="New Workout">Start a new workout here</ToolBox.Item>
               <ToolBox.Item heading="Gains">Analyze your amazing gains!</ToolBox.Item>
               <ToolBox.Item heading="Gains">Analyze your amazing gains!</ToolBox.Item>
               <ToolBox.Item heading="Gains">Analyze your amazing gains!</ToolBox.Item>
               <ToolBox.Item heading="Gains">Analyze your amazing gains!</ToolBox.Item>
            </ToolBox>
         </div>
      </div> */