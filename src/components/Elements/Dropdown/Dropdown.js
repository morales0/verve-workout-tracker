import React, { useRef } from 'react'
import { usePopUp } from '../../../hooks/component-hooks'
import styled from 'styled-components/macro'
import {isMobile} from 'react-device-detect'

import Button from '../Button/Button'
import DropdownButton from '../DropdownButton/DropdownButton'
import DropdownContainer from '../DropdownContainer/DropdownContainer'

const Dropdown = (props) => {
   const wrapperRef = useRef(null);
   const [open, setOpen] = usePopUp(wrapperRef);

   return (
      <div className={props.className}>
         <div ref={wrapperRef} css={`position: relative; z-index: 50;`}>
            <DropdownButton open={open} grow={props.grow} onClick={() => setOpen(!open)}>
               {props.label}
            </DropdownButton>
            <DropdownContainer open={open}>
               
               {/* <div css={`
                  padding: 0!important;
                  border: none!important;
                  text-align: center!important;
               `}> 
               
               </div>*/}
               {props.children}
            </DropdownContainer>
         </div>
      </div>
   )
}

const Item = (props) => {
   return (
      <div css={`
         display: flex;
         cursor: pointer;
         color: #424242;

         &> * {
            padding: 1rem;
            background: transparent;
            width: 100%;
         }

         /* &> div, span {
            padding: 1rem;
            background: transparent;
            width: 100%;
            font-size: 1rem;
         } */

         &:hover {
            ${isMobile ? '' : 'background-color: #eee;'}
         }
      `}>
         {props.children}
      </div>
   )
}

/* const ItemButton = styled.button`

`

const ItemLink = styled.a`

`

const ItemText = styled.p`

`

const ItemDiv = styled.div`

`

Item.Button = ItemButton
Item.Link = ItemLink
Item.Text = ItemText
Item.Div = ItemDiv */

export { Dropdown, Item }