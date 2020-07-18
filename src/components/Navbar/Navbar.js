import React from 'react'

import "./Navbar.scss"

const Navbar = (props) => {
   return (
      <div className="navbar_container">
         {props.children}
      </div>
   )
}


export default Navbar
