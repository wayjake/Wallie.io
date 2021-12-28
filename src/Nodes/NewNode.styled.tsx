import styled from 'styled-components/macro'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 2rem 2rem 2rem 2rem;
    align-items: stretch;
`

export const Input = styled.input`
    height: 2rem;
    margin: 0 0 0 1rem;
    flex: auto;
    & [readonly] {
        opacity: 0.4;
    }
`

export const Textarea = styled.textarea`
    height: 4rem;
    margin: 0 0 0 1rem;
    flex: auto;
`

export const Label = styled.label`
    display: flex;
    flex: auto;
`

export const Button = styled.button`
    height: 2rem;
    width: 100%;
`

export const itemBorder = `dashed red thin`

export const FormItem = styled.div`
    display: flex;
    padding: 1rem 1rem 1rem 1rem;
    border: ${itemBorder};
    border-bottom: none;
    &:last-child {
        border-bottom: ${itemBorder};
    }
    &.error label {
        color: red;
    }
`
