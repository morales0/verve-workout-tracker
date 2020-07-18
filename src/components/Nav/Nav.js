import React from 'react'

import styled from 'styled-components/macro'

const Nav = (props) => {
   return (
      <nav css={
         `margin-${props.justify === 'right' ? 'left' : 'right'}: auto`
      }>
         <ul>
            {React.Children.map(props.children, (child) => <li>{child}</li>)}
         </ul>
      </nav>
   )
}

export default Nav
