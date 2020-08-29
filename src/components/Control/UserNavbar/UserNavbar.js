import React from 'react'
import styled from 'styled-components/macro'
import verveLogo from '../../../images/verve_fire_logo_1.svg'

import { Navbar, Nav, UserNavIcon } from '../../'
import { Link } from 'react-router-dom'

const UserNavbar = (props) => {
   return (
      <Navbar>
        <Link to="/" css={`margin: 1rem 0;`}>
          <img src={verveLogo} alt="React Logo" width="45px"/>
        </Link>
        <Nav justify={"right"}>
          <a href="/viewcomponents">Test Components</a>
        </Nav>
        <UserNavIcon name={props.user.initials ? props.user.initials : "V"}/>
      </Navbar>
    )
}

export default UserNavbar