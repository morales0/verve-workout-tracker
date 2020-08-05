import React from 'react'
import { Dropdown, Item } from '../../components/'

const DropdownView = () => {
   return (
      <section className="component_section">
         <Dropdown label="Dropdown" grow={100}>
            <Item>
               Item
            </Item>
            <Item>
               Another Item
            </Item>
         </Dropdown>

         <Dropdown label="Longer Dropdown Label" grow={80}>
            <Item>
               Item
            </Item>
            <Item>
               Another Item That is Very LOOOOOONG
            </Item>
         </Dropdown>
         
      </section>
   )
}

export default DropdownView
