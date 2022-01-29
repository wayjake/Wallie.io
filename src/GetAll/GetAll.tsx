import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import gun, { namespace } from '../gun'
import { DungeonNode } from '../Nodes'

type ViewNodeProps = {
    node: DungeonNode
}

const ViewNode = ({ node }: ViewNodeProps) => {
    return (
        <div style={{ marginTop: 15 }}>
            <>[message]: {node.message}</>
            {node.head && (
                <Link style={{ marginLeft: 15 }} to={`/node/${node.head}`}>
                    [head]: {node.head}
                </Link>
            )}
        </div>
    )
}

const GetAll = () => {
    const [nodes, setNodes] = useState<DungeonNode[] | any[]>([])

    useEffect(() => {
        const allNodesQuery = gun
            .get(namespace + 'node')
            .map()
            .on((newNode: DungeonNode | any = {}, key) => {
                newNode.key = key
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
        return () => allNodesQuery.off()
    }, [])

    return (
        <>
            <Helmet>
                <title>GETTING ALL NODES</title>
            </Helmet>

            {!nodes.length && <>loading..</>}
            {nodes.length && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
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
                <ViewNode node={node} />
            ))}
        </>
    )
}

export default GetAll
