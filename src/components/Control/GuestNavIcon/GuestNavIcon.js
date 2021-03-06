import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import { useAuth } from '../../../context/auth-context'
import { usePopUp } from '../../../hooks/component-hooks';
import { ThemeToggle, Button } from '../..';



const GuestNavIcon = (props) => {
   const wrapperRef = useRef(null);
   const [toggle, setToggle] = usePopUp(wrapperRef);
   const [showLogIn, setShowLogIn] = useState(false)
   const [showRegister, setShowRegister] = useState(false)
   
   return (
      <>
      <div css={`
         align-items: flex-start;
         justify-content: center;
         background: #00000090;
         top: 0;
         left: 0;
         display: ${showLogIn ? 'flex' : 'none'};
         position: absolute;
         z-index: 200;
         height: 100vh;
         width: 100%;
         padding-top: 25vh;
      `}>
         <LogInWidget />
      </div>

      <div css={`
         align-items: flex-start;
         justify-content: center;
         background: #00000090;
         top: 0;
         left: 0;
         display: ${showRegister ? 'flex' : 'none'};
         position: absolute;
         z-index: 200;
         height: 100vh;
         width: 100%;
         padding-top: 25vh;
      `}>
         <RegisterWidget />
      </div>

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
            <div css={`
               flex: 1; 
               padding: 1rem 0;

               & > button {
                  margin: 5px;
               }
            `}>
               <ThemeToggle />
               <Button onClick={() => setShowLogIn(true)}>
                  Sign in
               </Button>
               <Button onClick={() => setShowRegister(true)}>
                  Create account
               </Button>
            </div>
         }
      </div>
      </>
   )
}

const LogInWidget = (props) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const authapi = useAuth()

   const handleLogIn = (e) => {
      e.preventDefault()
      authapi.login(email, password)
   }

   return (
      <form onSubmit={(e) => handleLogIn(e)}>
         <div css={`
            display: flex;
            flex-direction: column;
            background: #57657b;
            padding: 1rem;
            margin: auto;
            max-width: 90%;
            min-width: 240px;
            width: 300px;
         `}>
         
            <StyledTextInput type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <StyledTextInput type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            
            <Button type='submit'>Log in</Button>
         </div>
      </form>
   )
}

const RegisterWidget = (props) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
   const [initials, setInitials] = useState('')
   const authapi = useAuth()

   const handleRegister = (e) => {
      e.preventDefault()
      authapi.register(email, password, initials, name)
   }

   return (
      <form onSubmit={(e) => handleRegister(e)}>
         <div css={`
            display: flex;
            flex-direction: column;
            background: #57657b;
            padding: 1rem;
            margin: auto;
            max-width: 90%;
            min-width: 240px;
            width: 300px;
         `}>
         
            <StyledTextInput type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <StyledTextInput type='text' placeholder="Initials" value={initials} onChange={(e) => setInitials(e.target.value)} />
            <StyledTextInput type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <StyledTextInput type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            
            <Button type='submit'>Log in</Button>
         </div>
      </form>
   )
}

const StyledTextInput = styled.input`
   margin-bottom: .5rem;
   font-size: 1rem;
   padding: .5rem;
`

export default GuestNavIcon
