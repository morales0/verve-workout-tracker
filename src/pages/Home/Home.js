import React from 'react'
import styled from 'styled-components/macro'

import { Button } from '../../components'

const Home = () => {
   return (
      <div css={`
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
            width: 100%;
         `}>
            <Button>New Workout</Button>
            <Button>Goals</Button>
         </div>
      </div>
   )
}

export default Home
