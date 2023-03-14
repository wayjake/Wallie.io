import { useState } from 'react'

type ViewCountProps = {
   count: number
}

export default function ViewCount({ count }: ViewCountProps) {
   const [showMore, setShowMore] = useState(false)
   if (!count) return null

   const onShowMoreClicked = (event) => {
      event.preventDefault()
      setShowMore(true)
      setTimeout(() => setShowMore(false), 9 * 1000)
   }

   const Extener = () => (
      <span style={{ cursor: 'pointer' }} onClick={onShowMoreClicked}>
         {' ->'}
      </span>
   )

   const FormatViewCount = ({ count }) => {
      const seconds = count / 1000
      if (seconds > 1000000000) {
         return (
            <>
               {(seconds / 10000000).toFixed(4).toLocaleString()}G
               {showMore ? `iga-view-seconds` : <Extener />}
            </>
         )
      }
      if (seconds > 1000000) {
         return (
            <>
               {(seconds / 10000).toFixed(3).toLocaleString()}M
               {showMore ? `ega-view-seconds` : <Extener />}
            </>
         )
      }
      if (seconds > 1000) {
         return (
            <>
               {(seconds / 1000).toFixed(2).toLocaleString()}K
               {showMore ? `ilo-view-seconds` : <Extener />}
            </>
         )
      }
      return (
         <>
            {Math.floor(seconds)}s{showMore ? `econds` : <Extener />}
         </>
      )
   }

   return (
      <div className="viewCount">
         <FormatViewCount count={count} />
      </div>
   )
}
