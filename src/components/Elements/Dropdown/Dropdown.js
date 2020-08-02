import React, { useRef } from 'react'
import { usePopUp } from '../../../hooks/component-hooks'
import styled from 'styled-components/macro'
import {isMobile} from 'react-device-detect'

import { Button } from '../..'

const Dropdown = (props) => {
   const wrapperRef = useRef(null);
   const [open, setOpen] = usePopUp(wrapperRef);

   return (
      <div ref={wrapperRef}>
         <DropdownButton open={open} onClick={() => setOpen(!open)}>
            {props.label}
            <DropdownTriangleIcon open={open} />
         </DropdownButton>
            <div css={`
               position: absolute;
               max-height: 400px;
               opacity: ${open ? '1' : '0'};
               visibility: ${open ? 'visible' : 'hidden'};
               right: 0;
               top: 5px;
               z-index: -1;
               padding-top: ${open ? '50px' : '0'};
               min-width: 100%;
               background: #fafbfc;
               border-radius: 7px;
               border-top-left-radius: 15px;
               border-top-right-radius: 15px;
               box-shadow: 0 0 5px 0 #00000033;
               overflow: auto;
               transition: .5s;

               &> div + div {
                  border-top: 1px solid #d0d0d0;
               }
            `}>
               {props.children}
            </div>
      </div>
      
   )
}

const DropdownButton = styled(Button)`
   width: ${props => props.open ? '300px' : '150px'};
   @media only screen and (max-width: 500px) {
      width: 170px;
   }
   background: ${props => props.theme.themeValue.offBG};
   border: none;
   box-shadow: 0 0 10px 0 #00000025;
   border-radius: 15px;
   padding: 1rem .75rem;
   /* font-size: 1.2rem; */
   font-weight: 700;
   display: flex;
   justify-content: space-between;
   align-items: center;
   outline: none;
   transition: width .5s;
   -webkit-tap-highlight-color: transparent;

   &: hover {
      background: ${props => props.theme.themeValue.offBG};
      cursor: pointer;
   }
`

const DropdownTriangleIcon = styled.div`
   width: 0;
   height: 0;
   margin-left: .5rem;
   border-style: solid;
   border-width: 10px 10px 0 10px;
   border-color: #a9a9a9 transparent transparent transparent;
   transform: ${props => props.open ? 'rotate(-180deg)' : 'none'};
   transition: .5s;
`

const Item = (props) => {
   return (
      <div css={`
         cursor: pointer;
         color: #424242;

         &> * {
            padding: 1rem;
            background: transparent;
            width: 100%;
            font-size: 1rem;
         }

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