import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { TopBar } from '../Blog'
import gun, { namespace } from '../gun'
import { SimpleIcon, Styles } from '../Interface'
import { DungeonNode } from '../Nodes'
import { makeId } from '../utils'
import styled from 'styled-components'

type ViewNodeProps = {
    node: DungeonNode
    onNodeRemoved: (nodeKey: string) => void
}

const Menu = styled.div`
    flex: 1;
    display: flex;
    .simpleIcon {
        color: red;
        margin-left: 5px;
    }
`

const ViewNode = ({ node, onNodeRemoved }: ViewNodeProps) => {
    //@todo mark as viewed
    const derefNode = () => {
        gun.get(namespace + '/node')
            .get(node.key)
            .put(null, (awk) => {
                console.log(`deleted ${node.key} awk:`, awk)
                onNodeRemoved(node.key)
            })
    }

    return (
        <div style={{ marginTop: 15, padding: '5px 10px 20px 20px' }}>
            <div
                style={{}}
                dangerouslySetInnerHTML={{
                    __html: node.message || 'EMPTY MESSAGE',
                }}
            ></div>
            <br />
            <Menu>
                <Link style={{}} to={`/node/${node.key}`}>
                    [ID]: {node.key}
                </Link>

                {node.head && (
                    <Link style={{ marginLeft: 15 }} to={`/node/${node.head}`}>
                        [ParentId]: {node.head}
                    </Link>
                )}
                <SimpleIcon
                    content="[ ␡ ]"
                    hoverContent={'[ ␡ ]'}
                    style={Styles.warning}
                    className="simpleIcon"
                    onClick={() => derefNode()}
                />
            </Menu>
        </div>
    )
}

const GetAll = () => {
    const [nodes, setNodes] = useState<DungeonNode[] | any[]>([])

    const onNodeRemoved = (nodeKey: string) => {
        setNodes((nodes) => nodes.filter((node) => node.key !== nodeKey))
    }

    useEffect(() => {
        const allNodesQuery = gun
            .get(namespace + '/node')
            .map()
            .on((newNode: DungeonNode | any = {}, key) => {
                //some of these bad boys made it in as strings
                if (newNode === null) return
                if (typeof newNode === 'object') newNode.key = key
                //I like chaos
                else newNode = { message: newNode, key: makeId() }
                setNodes((nodes) => {
                    if (nodes.find((node) => node.key === newNode.key)) {
                        return nodes
                    }
                    return [
                        ...nodes.filter((node) => node.key !== newNode.key),
                        newNode,
                    ]
                })
            })
        return () => {
            allNodesQuery.off()
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>All Nodes - Wallie</title>
            </Helmet>
            <TopBar />
            {!nodes.length && <>loading..</>}
            {nodes.length && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        right: '1rem',
                        height: 42 / 2,
                        margin: '1rem 0',
                        background: 'grey',
                        color: 'white',
                    }}
                >
                    <b>Number of Nodes {nodes.length}</b>
                </div>
            )}
            {nodes.map((node) => (
                <ViewNode
                    node={node}
                    key={node.key}
                    onNodeRemoved={onNodeRemoved}
                />
            ))}
        </>
    )
}

export default GetAll
