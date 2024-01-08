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
      width: 60px;
      height: 34px;
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
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 34px;
   }

   .slider:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
   }
   input {
      appearance: none;
   }
   input:checked + .slider {
      background-color: var(--grey-dark);
   }

   input:checked + .slider:before {
      transform: translateX(26px);
   }
`
