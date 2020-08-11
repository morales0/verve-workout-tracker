import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components/macro'
import Button from '../Button/Button'
import TriangleIcon from '../TriangleIcon/TriangleIcon'

const DropdownButton = ({children, open, grow, ...rest}) => {
   const buttonRef = useRef(null)
   const [buttonWidth, setButtonWidth] = useState('auto')

   useEffect(() => {
      console.log(buttonRef)
      setButtonWidth(buttonRef.current.offsetWidth + 1)
   }, [])

   return (
      <StyledButton ref={buttonRef} 
         open={open} 
         growWidth={grow || 0}
         initialWidth={buttonWidth} 
         {...rest}
      >
         <span css={`
            padding: 0 10px;
         `}>
            {children}
         </span>
         <TriangleIcon css={`
            transform: ${open ? 'rotate(-180deg)' : 'none'};
            transition: .4s;
         `}/>
      </StyledButton>
   )
}

const StyledButton = styled(Button)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem .75rem;
   width: auto; /* ${props => {
      console.log(props.initialWidth)
      if (props.initialWidth === 'auto') return 'auto'

      return props.open ? props.initialWidth + props.growWidth + 'px' : props.initialWidth + 'px'
   }}; */
   background: ${props => props.theme.themeValue.offBG};
   box-shadow: 0 0 10px 0 #00000025;
   border: none;
   border-radius: 15px;
   outline: none;
   font-weight: 700;
   transition: width .4s ease;
   -webkit-tap-highlight-color: transparent;

   /* Grow transition if wanted */

   /* width: ${props => props.open ? '300px' : '150px'};
   @media only screen and (max-width: 500px) {
      width: 170px;
   } */

   &: hover {
      background: ${props => props.theme.themeValue.offBG};
   }
`

export default DropdownButton
