import { useEffect, useState } from 'react'
import gun, { namespace } from '../gun'

const useListen = (
    query: string | undefined | null,
    model: string = 'node',
    single: boolean = false
) => {
    const [nodes, setNodes] = useState<any[]>([])

    const setNodesCallback = (newNode: any = {}, key) => {
        console.log(newNode)
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
            const chain = gun
                .get(`${namespace}/${model}/${query}`)
                .on(setNodesCallback)
            return () => chain.off()
        }
        const chain = gun
            .get(`${namespace}/${model}`)
            .map()
            .on(setNodesCallback)
        return () => chain.off()
    }, [query])

    if (single) return nodes[0]
    return nodes
}

export default useListen
