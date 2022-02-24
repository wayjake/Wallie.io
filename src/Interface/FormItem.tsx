import styled from 'styled-components'

export const itemBorder = `dashed indigo thin`

type IFormItem = {
    hidden?: Boolean
}

const FormItem = styled.div<IFormItem>`
    display: ${(props) => (props.hidden ? 'none' : 'flex')};
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

export default FormItem
