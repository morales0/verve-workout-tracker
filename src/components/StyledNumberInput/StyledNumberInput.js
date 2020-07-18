import styled from 'styled-components'

const StyledNumberInput = styled.input.attrs(props => ({
   type: "number",
   inputmode: "numeric", 
   pattern: "[0-9]*"
}))`
   max-width: 3rem;
   outline: none;
   border: none;
   background: #e4e4e4;
   border-radius: 3px;
   padding: 5px;
   text-align: center;
   font-family: inherit;
   font-size: 1.35rem;

   &:focus{
      outline: 2px solid #aaa;
      outline-style: auto;
   }

`

export default StyledNumberInput