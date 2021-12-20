import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import styled from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DungeonNode, NewSubNode } from '.'

const ITEM_BORDER = `dashed blue thin`

const BackSectionWrapper = styled.div`
    padding: 1rem 2rem;
    border: ${ITEM_BORDER};
    display: flex;
    justify-content: space-between;
`

const BackButton = styled.div`
    font-weight: 800;
    cursor: pointer;
    color: white;
    background-color: blue;
    user-select: none;
    padding: 0.3rem 0.5rem;
    border-radius: 1rem;
`
const NewNode = styled(Link)`
    color: white;
    background-color: blue;
    padding: 0.3rem;
    border-radius: 1rem;
`

const MessageWrapper = styled.div`
    padding: 1rem 2rem;
    border: ${ITEM_BORDER};
    margin: 1rem 0 0 0;
`
const Username = styled.div`
    padding: 1rem 1rem;
    font-weight: 600;
    border: ${ITEM_BORDER};
`

const Message = styled.div`
    padding: 1rem 1rem;
    border: ${ITEM_BORDER};
    margin-top: 1rem;
`

const LinkWrapper = styled.div`
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    border: ${ITEM_BORDER};
    margin-top: 1rem;
`

const NodeLink = styled(Link)`
    padding: 1rem 1rem;
    border: ${ITEM_BORDER};
`

const ViewNode = () => {
    const [node, setNode] = useState<DungeonNode | undefined>()
    const { key = '' } = useParams()
    const navigate = useNavigate()
    const keyRef = gun.get(namespace + 'node').get(key)

    useEffect(() => {
        keyRef.once((node: DungeonNode | any = {}) => {
            setNode(node)
        })
    }, [key])

    const nodeAdded = () => {
        console.log(`i'm in view node`)
    }

    const goback = () => {
        navigate(`/node/${node?.head}`)
    }

    return (
        <>
            <Helmet>
                <title>View Node '{key.substring(0, 50)}'</title>
            </Helmet>
            {node?.head && (
                <BackSectionWrapper>
                    <BackButton onClick={goback}>{'< '}</BackButton>
                    <NewNode to="/nodes/new">New Node</NewNode>
                </BackSectionWrapper>
            )}
            <MessageWrapper>
                /* @todo put date here */
                {node?.user && <Username>@{node?.user}</Username>}
                <Message>{node?.message}</Message>
            </MessageWrapper>
            <LinkWrapper>
                <NodeLink to={`/node/${'key'}`}>{'key'}</NodeLink>
                <NewSubNode head={key} nodeAdded={nodeAdded} />
            </LinkWrapper>
        </>
    )
}

export default ViewNode
