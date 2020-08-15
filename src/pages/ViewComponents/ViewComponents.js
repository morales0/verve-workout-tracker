import React, { useState } from 'react'
import './ViewComponents.scss'
import ButtonsView from '../TestPages/ButtonsView'
import styled from 'styled-components/macro'
import DropdownView from '../TestPages/DropdownView'
import CreateExerciseView from '../TestPages/CreateExerciseView'

const ViewComponents = () => {
   const [component, setComponent] = useState('Create Exercise Widget')

   return (
      <div className="test_container">
         <header>
            <h2>Component: {component}</h2>
            <select value={component} onChange={(e) => setComponent(e.target.value)}>
               <option value="Button">Button</option>
               <option value="Link">Link</option>
               <option value="Dropdown">Dropdown</option>
               <option value="Create Exercise Widget">Create Exercise Widget</option>
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
      case 'Dropdown':
         return <DropdownView />
      case 'Create Exercise Widget':
         return <CreateExerciseView />
      default:
         return <div>{type} not supported yet</div>
   }
}


export default ViewComponents
