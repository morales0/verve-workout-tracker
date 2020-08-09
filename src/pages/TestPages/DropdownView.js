import React from 'react'
import styled from 'styled-components/macro'
import { Dropdown, Item } from '../../components/'

const DropdownView = () => {
   return (
      <section className="component_section">
         <Dropdown label="Dropdown">
            <Item name="Pushup">
               <div>Pushup</div>
            </Item>
            <Item name="Bulgarian Split Squats">
               <div>Bulgarian Split Squats</div>
            </Item>
            <Item name="Shoulder Press">
               <div>Shoulder Press</div>
            </Item>
            <Item name="Bench Press">
               <div>Bench Press</div>
            </Item>
            <Item name="Step Ups">
               <div>Step Ups</div>
            </Item>
            <Item name="Jump Rope">
               <div>Jump Rope</div>
            </Item>
         </Dropdown>
      </section>
   )
}

export default DropdownView
