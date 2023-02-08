import styled from 'styled-components'
import { useRef, useState } from 'react'
import { Button, Input } from '../Interface'
import useLocalStorage from '../utils/useLocalStorage'

const UsernameSessionStyled = styled.div`
   display: flex;
   align-items: center;
   .username {
      padding: 8px 0px 5px 17px;
      text-decoration: underline dotted;
      cursor: pointer;
   }
   button {
      height: 100%;
      margin-left: 5px;
   }
   input {
      padding-left: 10px;
   }
`

//TODO https://whimsical.com/vision-9EnTE6UhsnhaSzDzEYkCLr
export const UsernameSession = () => {
   const [username, setUsername] = useLocalStorage<string | null>(
      'username',
      null
   )
   const [editMode, setEditMode] = useState<boolean>(false)
   const usernameRef = useRef<HTMLInputElement>(null)

   const onSave = () => {
      if (!usernameRef.current) {
         return
      }
      setUsername(usernameRef.current.value)
      setEditMode(false)
   }
   const toggleEdit = () => {
      setEditMode((editMode) => !editMode)
   }

   const handleUserKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         onSave()
      }
   }
   /***
    * TODO && REMINDER
    *  you always think you don't need react hook form
    *  and then you want something as simple as extracting
    *  the input state and it's default value from submitting
    *  the form. Maybe one day you will learn.
    *
    */
   return (
      <UsernameSessionStyled>
         {username && !editMode && (
            <div className="username" onClick={toggleEdit}>
               {username}
            </div>
         )}
         {!username ||
            (editMode && (
               <>
                  <input
                     placeholder="username:password"
                     ref={usernameRef}
                     onKeyPress={handleUserKeyPress}
                  />
                  <Button onClick={onSave}>Save</Button>
               </>
            ))}
      </UsernameSessionStyled>
   )
}

export default UsernameSession
