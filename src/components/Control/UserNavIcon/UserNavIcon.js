import React, {useState, useEffect, useRef} from 'react'

import styled from 'styled-components/macro'

import { ThemeToggle } from '../..'

const usePopUp = (ref) => {
   const [toggle, setToggle] = useState(false)

   useEffect(() => {
      const clickOut = (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
            setToggle(false);
         }
      }

       // Bind the event listener
       document.addEventListener("mousedown", clickOut)

       return () => {
           // Unbind the event listener on clean up
           document.removeEventListener("mousedown", clickOut);
       };
   }, [ref]);

   return [
      toggle,
      setToggle,
   ]
}

/**
 * User Nav Icon on the top right of the screen in the navbar
 * 
 * TODO:
 * Read from user context? Or make user of the component determine what the output is
 * DEFINITELY use CSSTransitions library for this
 * 
 */
const UserNavIcon = ({name}) => {
   const wrapperRef = useRef(null);
   const [toggle, setToggle] = usePopUp(wrapperRef);
   
   return (
      
      <div className="user_nav_icon" 
         ref={wrapperRef}
         onClick={() => setToggle(true)}
         css={`
            height: ${toggle ? '300px' : '45px'};
            width: ${toggle ? '200px' : '45px'};

            /* align-self: ${toggle ? 'auto': 'auto'}; */
            border-radius: ${toggle ? '15px' : '25%'};
         `}
      >
         <span css={`padding-bottom: 0`}>{name ? name : "User"}</span>
         {toggle &&
            <div css={`flex: 1; padding: 1rem 0`}>
               <ThemeToggle />
            </div>
         }
      </div>
      
   )
}

export default UserNavIcon
