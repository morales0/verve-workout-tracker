import React, { useState } from 'react'
import './ViewComponents.scss'
import ButtonsView from '../TestPages/ButtonsView'
import styled from 'styled-components/macro'

const ViewComponents = () => {
   const [component, setComponent] = useState('Button')

   return (
      <div className="test_container">
         <header>
            <h2>Component: {component}</h2>
            <select onChange={(e) => setComponent(e.target.value)}>
               <option value="Button">Button</option>
               <option value="Link">Link</option>
               <option value="Dropdown">Dropdown</option>
            </select>
         </header>
         <hr css={`
            width: 80%;
            border: none;
            border-top: 2px solid #656565;
         `} />
         <ComponentPage type={component} />
      </div>
   )
}

const ComponentPage = ({type}) => {
   switch (type) {
      case 'Button':
         return <ButtonsView />
      default:
         return <div>{type} not supported yet</div>
   }
}


export default ViewComponents
