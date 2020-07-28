import React from 'react'
import styled from 'styled-components/macro'

const Select = (props) => {
   return (
      <StyledSelect>
         {props.children}
      </StyledSelect>
   )
}

const StyledSelect = styled.select`

`

const StyledOption = styled.option`

`

Select.Option = StyledOption

export default Select
