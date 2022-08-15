import { useState } from 'react'
import gun, { namespace } from '../gun'

const useUpdate = (model: string = 'node') => {
    const [loading, setLoading] = useState<boolean>(false)
    const [node, setNode] = useState<any | undefined>()

    const createNode = (data: any) => {
        console.log(`creating node`)
        console.log(data)
        if (!data) {
            return
        }
        if (!data.key) {
            throw new Error('Key is required')
        }
        setLoading(true)

        gun.get(`${namespace}/${model}`)
            .get(data.key)
            .put(data, (awk) => {
                setLoading(false)
                setNode(data)
                console.log(awk)
            })
    }

    return [createNode, loading, node]
}

export default useUpdate
