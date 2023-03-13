import { useEffect, useRef, useState } from 'react'
import gun, { namespace } from '../GunApi/gun'

export default function useViewCount(nodeId) {
   const [views, setViews] = useState(1)
   const [intervalLength, setIntervalLength] = useState(5 * 1000)
   const lastUpdateSent = useRef(new Date())

   useEffect(() => {
      const endListener = onViews((newViews: any) => {
         if (newViews < views) return
         if (!newViews) return
         setViews(newViews)
      })

      return () => {
         endListener()
      }
   }, [nodeId, intervalLength])

   useEffect(() => {
      const intervalId = setInterval(() => {
         console.log(
            `last updated viewTime: `,
            lastUpdateSent.current.getTime()
         )
         const newLastUpdateSent = new Date()
         const newViewTime =
            newLastUpdateSent.getTime() - lastUpdateSent.current.getTime()
         const newViewCount = views + newViewTime
         sendViewsRequest(nodeId, newViewCount)
         console.log(`new viewcount for ${nodeId}:`, newViewCount)
         setViews(newViewCount)
         lastUpdateSent.current = newLastUpdateSent
      }, intervalLength)

      return () => clearInterval(intervalId)
   }, [nodeId, views, intervalLength])

   const sendViewsRequest = (nodeId, views: number) => {
      if (typeof views === 'undefined') return
      return gun
         .get(namespace + '/views')
         .get(nodeId)
         .put(views, (awk) => {
            console.log(`updated viewTime: `, awk)
         })
   }

   const onViews = (callback) => {
      if (!nodeId) {
         return () => {}
      }
      return gun
         .get(namespace + '/views')
         .get(nodeId)
         .once((data) => {
            callback(data)
         }).off
   }

   return [views]
}
