import React from 'react'

import verveLogo from './images/verve_fire_logo_1.svg'

import { Navbar, Nav, UserNavIcon } from '..'

const UserNavbar = (props) => {
   return (
      <Navbar>
        <a href="/" css={`
          margin: 1rem 0;
        `}>
          <img src={verveLogo} alt="React Logo" width="45px"/>
        </a>
        <Nav justify="right">
          <a href="/viewcomponents">Test Components</a>
        </Nav>
        <UserNavIcon name={props.user.initials ? props.user.intials : "V"}/>
      </Navbar>
    );
}

export default UserNavbar