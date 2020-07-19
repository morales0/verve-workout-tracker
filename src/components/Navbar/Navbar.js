import React from 'react'
import styled from 'styled-components/macro'

import "./Navbar.scss"

const Navbar = (props) => {
   return (
      <div className="navbar_container" css={`
         background: ${props => props.theme.themeValue.offBG};

         & > div.user_nav_icon {
            background: ${props => props.theme.themeValue.offBG};
      `}>
         {props.children}
      </div>
   )
}


export default Navbar
