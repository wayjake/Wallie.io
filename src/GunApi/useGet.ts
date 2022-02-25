import { useEffect, useState } from 'react'
import gun, { namespace } from '../gun'

const useListen = (
    query: string | undefined,
    model: string = 'node',
    single: boolean = false
) => {
    const [nodes, setNodes] = useState<any[]>([])

    const setNodesCallback = (newNode: any = {}, key) => {
        setNodes((nodes) => {
            const filteredNodes = nodes.filter((node) => node.key !== key)
            if (!newNode) {
                return filteredNodes
            }
            return [...filteredNodes, { ...newNode, key }]
        })
    }

    useEffect(() => {
        if (query) {
            gun.get(`${namespace}/${model}`).get(query).once(setNodesCallback)
            return
        }
        gun.get(`${namespace}/${model}`).map().once(setNodesCallback)
    }, [])

    if (single) return nodes[0]
    return nodes
}

export default useListen
