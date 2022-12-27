import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type ILink = {
   path: string
   text: string
}

type DropdownProps = {
   links: ILink[]
   children: React.ReactChild
}

export const DropDownStyled = styled.div`
   padding: 6px 5px 8px 20px;
   position: relative;
   .top a {
      cursor: pointer;
   }
   a {
      user-select: none;
      white-space: nowrap;
      display: flex;
      min-width: 20px;
      color: black;
      text-decoration: none;
   }
   a:hover {
      color: black;
   }
   .dropdown {
      position: absolute;
      z-index: 3;
      display: flex;
      flex-direction: column;
      min-width: 100px;
      margin: 4px 0px 0px 0px;
      padding: 1px 20px 17px 20px;
      border-radius: 5px;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
         rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      a {
         margin: 10px 0 0 0;
      }
   }
`
export const DropDown = ({ links, children }: DropdownProps) => {
   const [open, setOpen] = useState(false)
   const navigate = useNavigate()
   const ref = useRef<any>(null)

   // Setup on click listeners to close dropdowns
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false)
         }
      }
      document.addEventListener('click', handleClickOutside, true)
      return () => {
         document.removeEventListener('click', handleClickOutside, true)
      }
   }, [])

   const topClicked = (e) => {
      e.preventDefault()
      navigate(links[0].path)
   }

   const topDoubleClicked = (e) => {
      e.preventDefault()
      setOpen((open) => !open)
   }

   return (
      <DropDownStyled
         ref={ref}
         // onMouseEnter={() => setOpen(true)}
         // onMouseLeave={() => setOpen(false)}
      >
         <div className="top">
            <a onClick={topClicked} onDoubleClick={topDoubleClicked}>
               {children}
            </a>
         </div>
         {open && (
            <div className="dropdown">
               {links.map(({ path, text }, index) => {
                  return (
                     <Link key={index} to={path}>
                        {text}
                     </Link>
                  )
               })}
            </div>
         )}
      </DropDownStyled>
   )
}
