import { useEffect, useState } from 'react'
import gun, { namespace } from '../gun'

const useListen = (
    query: string | undefined,
    model: string = 'node',
    single: boolean = false
) => {
    const [nodes, setNodes] = useState<any[]>([])

    useEffect(() => {
        if (!query) return
        const allNodesQuery = gun
            .get(`${namespace}/${model}`)
            .get(query)
            .map()
            .on((newNode: any = {}, key) => {
                setNodes((nodes) => {
                    if (nodes.find((node) => node.key === key)) {
                        return nodes
                    }
                    return [...nodes, newNode]
                })
            })
        return () => allNodesQuery.off()
    }, [])

    if (single) return nodes[0]
    return nodes
}

export default useListen
