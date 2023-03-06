import { useState } from 'react'
import { DungeonNode } from '.'
import DOMPurify from 'dompurify'
import gun, { namespace } from '../GunApi/gun'
import { useNavigate } from 'react-router-dom'

const nodeRef = gun.get(namespace + '/node')

export const useCreateNode = (callback = (node: DungeonNode) => {}) => {
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const createNode = (node: DungeonNode) => {
      if (!node) {
         return
      }
      //we need to populate the current data into the struct
      const newNode = { ...node, date: Date.now() }

      if (!node.head) {
         setLoading(true)
      } else {
         callback(newNode)
      }

      //not too worried about this request finishing
      addDirectionNode(node)

      nodeRef.get(node.id).put(newNode, (ack) => {
         if (node.head) {
            return
         }
         callback(newNode)
         setLoading(false)
         navigate(`/node/${node.id}`)
      })
   }
   return [createNode, loading]
}

function addDirectionNode(node: DungeonNode) {
   if (!node.head) {
      return
   }
   const messagePreview = DOMPurify.sanitize(node.message, {
      ALLOWED_TAGS: ['b', 'i'],
   })
   nodeRef
      .get(node.head)
      .get('directions')
      .get(node.id)
      .put(node.directionText || messagePreview, (ack) => {
         console.log(`added message preview`)
      })
}
