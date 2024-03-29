import UsernameSession from './UsernameSession'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import WallieLeft from './Wallie-Icon-Left.png'
import WallieRight from './Wallie-Icon-Right.png'
import { DropDownStyled } from '../Interface/Dropdown'
import { useMemo } from 'react'
import { random } from 'lodash'
import { useClock } from './useClock'
import { Button } from 'Interface'
import { DarkToggle } from './DarkToggle'

const TopBarStyled = styled.div`
   box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

   display: flex;
   justify-content: flex-start;
   padding: 0.4rem 0rem;
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
      padding-top: 4px;
   }
   .usernameSession {
      input {
         height: 30px;
      }
   }
   .newNode button {
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-left: 10px;
      height: 30px;
      font-weight: 800;
      font-size: 1rem;
      div {
         margin-left: 4px;
      }
      img {
         height: 27px;
         padding-bottom: 5px;
         padding-top: 4px;
         padding-left: 5px;
      }
   }
   .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      .wallieText {
         margin-top: -40px;
         margin-left: 5px;
         color: var(--text-color);
         font-family: 'Work Sans', sans-serif;
         font-weight: 800;
         font-size: 22px;
         text-shadow: -4px 4px #ef3550, -8px 8px #f48fb1, -12px 12px #7e57c2,
            -16px 16px var(--color-primary), -20px 20px #26c6da,
            -24px 24px #43a047, -28px 28px var(--bright-yellow),
            -32px 32px #f9a825, -36px 36px #ff5722;
      }
   }
   .darkToggle {
      margin-top: 3px;
      margin-left: auto;
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
            <div className="wallieText">wallie</div>
         </Link>
         <Link to="/node/new" className="newNode">
            <Button>
               <div>New</div>
               <img src={RandomLogo} alt="Wallie Logo Dark" />
            </Button>
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
         <div className="darkToggle">
            <DarkToggle />
         </div>
      </TopBarStyled>
   )
}

export default TopBar
