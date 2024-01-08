import styled from 'styled-components'

const Textarea = styled.textarea`
   height: 7rem;
   margin: 0 0 0 0rem;
   flex: auto;
   background-color: var(--input-bg);
   color: var(--input-text);
   border: 1px solid var(--input-border);
   padding: 10px;
   border-radius: 5px;
   ::placeholder {
      color: var(--input-placeholder);
   }
`

export default Textarea
