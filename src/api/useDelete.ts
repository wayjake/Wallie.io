import { useState } from 'react'
import gun, { namespace } from './gun'

const useDelete = (model: string = 'node', archive: boolean = false) => {
   const [loading, setLoading] = useState<boolean>(false)

   const performDelete = (key: string) => {
      gun.get(`${namespace}/${model}`)
         .get(key)
         .put(null as any, () => {
            setLoading(false)
         })
   }

   const deleteNode = (key: string): void => {
      console.log(`delete node ${key}`)
      if (!key) {
         throw new Error('Key is required')
      }
      setLoading(true)
      if (archive) {
         gun.get(`${namespace}/${model}`)
            .get(key)
            .once((data: any) => {
               gun.get(`${namespace}/archive`).get(key).put(data)
               performDelete(key)
            })
         return
      }
   }

   return [deleteNode, loading] as const // see https://fettblog.eu/typescript-react-typeing-custom-hooks/
}

export default useDelete
