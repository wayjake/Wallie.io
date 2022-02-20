import { useEffect, useState } from 'react'
import gun, { namespace } from '../gun'

const useListen = (query: string) => {
    const [nodes, setNodes] = useState<any[]>([])

    useEffect(() => {
        const allNodesQuery = gun
            .get(namespace + query)
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

    return nodes
}

export default useListen
