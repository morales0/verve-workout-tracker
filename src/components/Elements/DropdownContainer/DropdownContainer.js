import React from 'react'
import styled from 'styled-components/macro'

const DropdownContainer = (props) => {
   return (
      <div css={`
         position: absolute;
         max-height: 400px;
         opacity: ${props.open ? '1' : '0'};
         visibility: ${props.open ? 'visible' : 'hidden'};
         right: 0;
         top: 5px;
         z-index: -1;
         padding-top: ${props.open ? '50px' : '0'};
         min-width: 100%;
         background: #fafbfc;
         border-radius: 7px;
         border-top-left-radius: 15px;
         border-top-right-radius: 15px;
         box-shadow: 0 0 5px 0 #00000033;
         overflow: auto;
         transition: .4s;

         &> div + div {
            border-top: 1px solid #d0d0d0;
         }
      `}>
         {props.children}
      </div>
   )
}

export default DropdownContainer
