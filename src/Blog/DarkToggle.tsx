import styled from 'styled-components'
import { useEffect, useState } from 'react'

export const DarkToggle = () => {
   // State to hold the checked status of the toggle
   const [isDarkMode, setIsDarkMode] = useState(() => {
      // Get the stored preference from localStorage
      const savedTheme = localStorage.getItem('theme')
      const isDarkMode = savedTheme === 'dark'
      const root = document.documentElement
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
      return isDarkMode
   })

   useEffect(() => {
      // Apply the theme on initial load
      const root = document.documentElement
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
   }, [isDarkMode])

   const toggleTheme = (event) => {
      const isChecked = event.target.checked
      setIsDarkMode(isChecked)

      // Store the preference in localStorage
      localStorage.setItem('theme', isChecked ? 'dark' : 'light')
   }

   return (
      <Dte>
         <label className="switch">
            <input
               type="checkbox"
               checked={isDarkMode}
               onChange={toggleTheme}
            />
            <span className="slider"></span>
         </label>
      </Dte>
   )
}

const Dte = styled.div`
   .switch {
      position: relative;
      display: inline-block;
      width: var(--slider-width);
      height: var(--slider-height);
      margin-right: 5px;
   }

   /* The slider */
   .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--slider-background);
      transition: 0.4s;
      border-radius: var(--slider-border-radius);
   }

   .slider:before {
      position: absolute;
      content: '';
      height: var(--slider-knob-size);
      width: var(--slider-knob-size);
      left: var(--slider-knob-offset);
      bottom: var(--slider-knob-offset);
      background-color: white;
      transition: 0.4s;
      border-radius: var(--slider-knob-border-radius);
   }

   input {
      appearance: none;
   }

   input:checked + .slider {
      background-color: var(--slider-checked-background);
   }

   input:checked + .slider:before {
      transform: translateX(var(--slider-knob-translateX));
   }
`
