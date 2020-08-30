import React from 'react'
import styled from 'styled-components/macro'

import "./Navbar.scss"

const Navbar = (props) => {
   return (
      <div className="navbar_container" css={`
         background: ${props => props.theme.themeValue.offBG};

         & > div.user_nav_icon {
            background: ${props => props.theme.themeValue.offBG};
         }

         & li > a {
            color: ${props => props.theme.themeValue.name === 'Dark' ? '#f9f9f9' : '#383c3b'}
         }

         & li > a:hover {
            color: ${props => props.theme.themeValue.name === 'Dark' ? '#383c3b' : 'initial'}
         }
      `}>
         {props.children}
      </div>
   )
}


export default Navbar
