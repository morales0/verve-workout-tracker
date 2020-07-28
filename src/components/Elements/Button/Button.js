import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
   background: transparent;
   -webkit-appearance: none;
   border: 2px solid #525252;
   border-radius: 5px;
   padding: .5rem 1rem;
   cursor: pointer;

   transition: .35s;

   &:hover {
      background: #00000011;
   }
`;

export default Button
