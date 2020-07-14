import React from 'react'
import styled from 'styled-components/macro'

import { Button } from '../'

const ToolBoxItem = (props) => (
   <ToolBoxButton as="a" href={props.href}>
      {props.heading && 
      <h2 css={`
         color: #f94e4e;
         font-family: 'Montserrat', sans-serif;
         text-transform: uppercase;
      `}>
         {props.heading}
      </h2>} 
      <div css={`
         padding: .75rem;
         font-size: 1rem;
         color: #1a1a1a;
      `}>
         <p>{props.children}</p>
      </div>
   </ToolBoxButton>
)

// Styled UI components
const ToolBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;
   padding: 1.75rem 1rem;
   min-width: 60%;

   box-shadow: 0 0 5px 0 #ffa3a3 ;
   border-radius: 10px;

   & > button, a {
      margin: 2rem;
   }
`
const ToolBoxButton = styled(Button)`
   padding: 1rem .5rem;
   flex: 1;
   text-decoration: none;
   text-align: center;

   &:hover {
      background: #ffa3a318;
   }
`

// Compact the import into one object
ToolBox.Item = ToolBoxItem

export default ToolBox
