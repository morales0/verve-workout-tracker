import React, { useState } from 'react'
import styled from 'styled-components/macro'

const DropdownContainer = ({children, open, search = true, ...rest}) => {
   const [filter, setFilter] = useState('')

   return (
      <DropdownContainerDiv open={open}>
         {search && <DropdownSearch onChange={(value) => setFilter(value)}/>}

         <DropdownContent>
            <div>
               {React.Children.map(children, (child, index) => {
                  let keep = filter.localeCompare('') === 0 || child.props.name.toLowerCase().startsWith(filter.toLowerCase())
                  return keep ? child : null;
               })}
            </div>
         </DropdownContent>
      </DropdownContainerDiv>
   )
}

const DropdownContainerDiv = styled.div`
   position: absolute;
   right: 0;
   top: 5px;
   z-index: -1;
   display: flex;
   flex-direction: column;
   justify-content: center;
   min-width: 100%;
   max-height: 300px;
   padding-top: ${props => props.open ? '50px' : '0'};
   opacity: ${props => props.open ? '1' : '0'};
   visibility: ${props => props.open ? 'visible' : 'hidden'};
   background: #fafbfc;
   border-radius: 7px;
   border-top-left-radius: 15px;
   border-top-right-radius: 15px;
   box-shadow: 0 0 5px 0 #00000033;
   overflow: hidden;
   transition: .4s;
`

const DropdownSearch = (props) => {

   return (
      <input onChange={(e) => props.onChange(e.target.value)}
      type="text" placeholder="search"
         css={`
            margin: 0 auto .5rem auto;
            padding: 6px 10px;
            width: 90%;
            max-width: 150px;
            min-width: 100px;
            border: none;
            outline: none;
            background: transparent;
            border-bottom: 1px solid #aaa;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            color: #323b38;
            transition: .3s;

            &:hover, :focus{
               background: #e8e8e8;
            }
         `} 
      />
   )
}

const DropdownContent = styled.div`
   display: flex;
   flex-direction: column;
   overflow-y: auto;
   -webkit-overflow-scrolling: touch;

   &> div > div + div {
      border-top: 1px solid #d0d0d0;
   }

   /* &> div > * {
      padding: 1rem;
      background: transparent;
      width: 100%;
      font-size: 1rem;
   } */

   &::-webkit-scrollbar {
      width: 5px;
   }
   &::-webkit-scrollbar-track {
      background: transparent;
      margin-bottom: 5px;
   }
   &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 20px;
      border: none;
   }
`

export default DropdownContainer
