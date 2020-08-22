import React, { useRef } from 'react'
import { usePopUp } from '../../../hooks/component-hooks';
import { ThemeToggle } from '../..';


const GuestNavIcon = (props) => {
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
         <span css={`padding-bottom: 0`}>{props.name ? props.name : "User"}</span>
         {toggle &&
            <div css={`flex: 1; padding: 1rem 0`}>
               <ThemeToggle />
               <button>
                  Sign in
               </button>
               <button>
                  Create account
               </button>
            </div>
         }
      </div>
      
   )
}

export default GuestNavIcon
