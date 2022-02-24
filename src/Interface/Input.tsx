import styled from 'styled-components/macro'

const Input = styled.input`
    height: 2rem;
    margin: 0 0 0 1rem;
    flex: auto;
    & [readonly] {
        opacity: 0.4;
    }
`

export default Input
