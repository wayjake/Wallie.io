import { FC } from 'react'
import styled from 'styled-components/macro'

const StyledInput = styled.input`
   height: 2rem;
   width: 100%;
   margin: 0;
   flex: auto;
   & [readonly] {
      opacity: 0.4;
   }
   background-color: var(--input-bg);
   color: var(--input-text);
   border: 1px solid var(--input-border);
   padding: 10px;
   border-radius: 5px;
   ::placeholder {
      color: var(--input-placeholder);
   }
`

type InputT = {
   placeholder?: string
   onKeyPress?: (e: React.KeyboardEvent) => void
   name?: string
   register?: Function
   required?: boolean
}

const Input: FC<InputT> = ({
   name,
   register,
   required = false,
   placeholder,
   onKeyPress,
}) => {
   const registerHolder = register && name ? register(name, { required }) : {}

   return (
      <StyledInput
         {...registerHolder} //{register ? ...(register(name), { required }) : undefined}
         placeholder={placeholder}
         onKeyPress={onKeyPress}
      ></StyledInput>
   )
}

export default Input
