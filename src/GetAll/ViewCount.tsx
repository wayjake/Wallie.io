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
   }

   const Extener = () => <span onClick={onShowMoreClicked}>{' >'}</span>
   const FormatViewCount = ({count}) => {
      const seconds = count / 1000
      if (seconds > 1000000000) {
         return (<>
         {Math.floor(seconds / 10000000).toLocaleString()}G$}
            {showMore ? `iga-view-seconds` : <Extener />}</>)
         
      }
      if (seconds > 1000000) {
         return `${Math.floor(seconds / 10000).toLocaleString()}M${
            showMore ? `ega-view-seconds` : <Extener />
         }`
      }
      if (seconds > 1000) {
         return `${Math.floor(seconds / 1000).toLocaleString()}K${
            showMore ? `ilo-view-seconds` : <Extener />
         }`
      }
      return `${seconds}s${showMore ? `seconds` : <Extener />}`
   }

   return <div className="viewCount"><FormatViewCount count={count} /></div>
}
