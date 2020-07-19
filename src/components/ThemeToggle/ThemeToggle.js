import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { darkTheme, lightTheme } from '../../context/themes'
import { Button } from '..'

const ThemeToggleButton = styled(Button)`

`

const ThemeToggle = () => {
   const {themeValue, setThemeValue} = useContext(ThemeContext)

   return (
      <ThemeToggleButton onClick={() => setThemeValue(themeValue.name === 'Dark' ? lightTheme : darkTheme)}>
         {themeValue.name === 'Dark' ? 'Light' : 'Dark'} Mode
      </ThemeToggleButton>
   )
}

export default ThemeToggle
