import UsernameSession from './UsernameSession'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import WallieLeft from './Wallie-Icon-Left.png'
import WallieRight from './Wallie-Icon-Right.png'
import { DropDownStyled } from '../Interface/Dropdown'
import { useMemo } from 'react'
import { random } from 'lodash'
import { useClock } from './useClock'

const TopBarStyled = styled.div`
   box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

   padding: 2px ​0px 2px 0px;
   display: flex;
   img {
      height: 25px;
      padding-bottom: 5px;
      padding-top: 5px;
      padding-left: 16px;
   }
   .beta {
      transform: rotate(180deg);
      color: #f8633c;
      font-weight: bold;
      font-size: 10px;
      font-style: italic;
      margin-left: 3px;
      margin-bottom: 8px;
   }
   .nav {
      display: flex;
      margin-left: 1em;
   }
   .usernameSession {
      input {
         height: 30px;
      }
   }
   .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      .wallieText {
         margin-top: -3px;
         margin-left: 5px;
         color: #333336;
         font-family: 'Work Sans', sans-serif;
         font-weight: 800;
         font-size: 27px;
      }
   }
`

const TopBar = () => {
   const clock = useClock()
   const RandomLogo = useMemo(() => {
      return [WallieLeft, WallieRight][random(0, 1)]
   }, [])
   return (
      <TopBarStyled>
         {' '}
         <Link to="/all" className="logo">
            {' '}
            <img src={RandomLogo} alt="Wallie Logo Dark" />
            <div className="wallieText">wallie</div>
         </Link>
         <div className="nav">
            {clock && (
               <DropDownStyled>
                  <Link to="/dashboard/clock">{clock.directionText}</Link>
               </DropDownStyled>
            )}
         </div>
         <div className="usernameSession">
            <UsernameSession />
         </div>
      </TopBarStyled>
   )
}

export default TopBar
