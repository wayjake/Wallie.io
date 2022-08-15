import styled from 'styled-components'
import { GunId } from '.'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: stretch;
    margin-top: 1rem;
`

export const Button = styled.button`
    width: 100%;
    font-weight: 800;
    cursor: pointer;
    color: white;
    background-color: black;
    user-select: none;
    padding: 1rem 0rem;
    border-radius: 1rem;
    border: none;
    box-shadow: none;
`

export const FormItem = styled.div`
    padding: 1rem 1rem 1rem 1rem;
    border-bottom: none;
    &.error label {
        color: red;
    }
`

export type NewSubNodeProps = {
    head?: GunId
    dashboardFeature?: boolean
    nodeAdded: Function
}

export const CancelButton = styled.div`
    color: black;
    width: 2.5rem;
    align-self: end;
    cursor: pointer;
`
