import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export const ITEM_BORDER = `dashed blue thin`

export const BackSectionWrapper = styled.div`
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
`

export const BackButton = styled.div`
    font-weight: 800;
    cursor: pointer;
    color: white;
    background-color: blue;
    user-select: none;
    padding: 0.3rem 0.5rem;
    border-radius: 1rem;
`
export const ViewNode = styled.div`
    display: flex;
    flex-direction: column;
`
export const NewNode = styled(Link)`
    color: white;
    background-color: blue;
    padding: 0.3rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`

export const MessageWrapper = styled.div`
    padding: 1rem 2rem;
    margin: 1rem 0 0 0;
`
export const MessageTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const Username = styled.div`
    padding: 1rem 1rem;
    font-weight: 600;
    border: ${ITEM_BORDER};
`
export const MessageDate = styled.div`
    padding: 1rem 1rem;
    border: ${ITEM_BORDER};
`

export const Message = styled.div`
    padding: 1rem 1rem;
    border: ${ITEM_BORDER};
    margin-top: 1rem;
`

export const NewNodeWrapper = styled.div`
    padding: 1rem;
`
