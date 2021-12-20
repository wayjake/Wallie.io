import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import styled from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Directions, DungeonNode, NewSubNode } from '.'

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
const MessageTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Username = styled.div`
    padding: 1rem 1rem;
    font-weight: 600;
    border: ${ITEM_BORDER};
`
const MessageDate = styled.div`
    padding: 1rem 1rem;
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
    margin-top: 0.5rem;
`

const ViewNode = () => {
    const [node, setNode] = useState<DungeonNode | undefined>()
    const [directions, setDirections] = useState<any>({})
    const { key = '' } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        gun.get(namespace + 'node')
            .get(key)
            .once((node: DungeonNode | any = {}) => {
                setNode(node)
            })
    }, [key])

    useEffect(() => {
        setDirections({})
        gun.get(namespace + 'node')
            .get(key)
            .get('directions')
            .map()
            .once((message: any, key: any) => {
                setDirections((prev: any) => {
                    return { ...prev, ...{ [key]: message } }
                })
            })
    }, [key])

    const nodeAdded = () => {
        console.log(`i'm in view node`)
    }

    const goback = () => {
        navigate(`/node/${node?.head}`)
    }

    const dateFormatted = useMemo(() => {
        if (!node?.date) return ''
        const date = new Date(node?.date)

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }, [node?.date])

    return (
        <>
            <Helmet>
                <title>View Node '{key.substring(0, 50)}'</title>
            </Helmet>

            <BackSectionWrapper>
                {node?.head && <BackButton onClick={goback}>{'< '}</BackButton>}
                {!node?.head && <div>&nbsp;</div>}
                <NewNode to="/nodes/new">New Parent</NewNode>
            </BackSectionWrapper>

            <MessageWrapper>
                <MessageTop>
                    {node?.user && <Username>@{node?.user}</Username>}
                    <MessageDate>{dateFormatted}</MessageDate>
                </MessageTop>
                <Message>{node?.message}</Message>
            </MessageWrapper>
            <LinkWrapper>
                {Object.keys(directions).map((key: string) => {
                    return (
                        <NodeLink to={`/node/${key}`} key={key}>
                            {directions[key]}
                        </NodeLink>
                    )
                })}
                <NewSubNode head={key} nodeAdded={nodeAdded} />
            </LinkWrapper>
        </>
    )
}

export default ViewNode
