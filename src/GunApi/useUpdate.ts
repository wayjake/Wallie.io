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

        const key = data.key
        delete data.key

        gun.get(`${namespace}/${model}`)
            .get(key)
            .put(data, (ack) => {
                setLoading(false)
                setNode({ ...data, key })
            })
    }

    return [createNode, loading, node]
}

export default useUpdate
