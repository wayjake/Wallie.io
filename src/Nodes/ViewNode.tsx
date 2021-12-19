import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DungeonNode } from '.'

const MessageWrapper = styled.div`
    padding: 2rem;
`
const Username = styled.div`
    font-weight: 600;
`

const Message = styled.div``

const LinkWrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
`

const NodeLink = styled(Link)`
    padding: 1rem 0rem;
`

const Button = styled.button`
    font-weight: 600;
    width: auto;
`

const ViewNode = () => {
    const [node, setNode] = useState<DungeonNode | undefined>()
    const { key = '' } = useParams()
    const keyRef = gun.get(namespace + 'node').get(key)

    useEffect(() => {
        keyRef.once((node: DungeonNode | any = {}) => {
            setNode(node)
        })
    }, [key])

    const titleText = key.substring(0, 50)
    return (
        <>
            <Helmet>
                <title>View Node '{titleText}'</title>
            </Helmet>
            <MessageWrapper>
                {node?.user && <Username>{node?.user}:</Username>}
                <Message>{node?.message}</Message>
            </MessageWrapper>
            <LinkWrapper>
                <NodeLink to={`/node/${'key'}`}>{'key'}</NodeLink>
                <Button>New</Button>
            </LinkWrapper>
        </>
    )
}

export default ViewNode
