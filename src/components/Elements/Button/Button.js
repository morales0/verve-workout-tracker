import React from 'react'
import {isMobile} from 'react-device-detect'
import styled from 'styled-components'

const sizes = {
   'small': {
      fontSize: '.85rem',
      padding: '.5rem .75rem',
   },
   'medium': {
      fontSize: '1rem',
      padding: '.75rem 1rem',
   },
   'large': {
      fontSize: '1.25rem',
      padding: '1rem 1.25rem',
   }
}

const Button = styled.button`
   /* Remove default styles */
   appearance: none;
   outline: none;

   /* Base styles */
   height: fit-content;
   padding: ${props => props.size ? sizes[props.size].padding : sizes['small'].padding};
   font-size: ${props => props.size ? sizes[props.size].fontSize : sizes['small'].fontSize};
   background: ${props => props.bg || 'transparent'};
   color: inherit;
   border: 2px solid #525252;
   border-radius: 5px;
   
   cursor: pointer;

   transition: .35s;

   &:hover {
      ${isMobile ? '' : 'background-color: #eee;'}
   }
`;

export default Button
