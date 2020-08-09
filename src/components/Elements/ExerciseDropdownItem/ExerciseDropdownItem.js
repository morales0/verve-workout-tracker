import React from 'react'
import styled from 'styled-components/macro'
import {Item} from '../Dropdown/Dropdown'

const ExerciseDropdownItem = (props) => {
   return (
      <Item name={props.name || ""}>
         <button onClick={() => props.onClick(props.name)} css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            cursor: pointer;
            font-family: inherit;
            color: inherit;
            border: none;
            outline: none;
         `}>
            <span css={`
               text-align: left;
            `}>{props.name}</span>
            <span css={`
               margin-left: .5rem;
            `}>+</span>
         </button>
      </Item>
   )
}

export default ExerciseDropdownItem
