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
      padding: '1rem 1rem',
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
   background: ${props => props.disabled ? '#ddd' : (props.bgColor || props.theme.themeValue.offBG)};
   border: none;
   border-radius: 15px;
   box-shadow: 0 0 10px 0 #00000025;
   color: inherit;
   font-family: inherit;
   
   cursor: pointer;

   transition: .35s;

   &:hover {
      ${props => isMobile || props.disabled ? '' : 'filter: brightness(1.1);'}
   }
`;

export default Button
