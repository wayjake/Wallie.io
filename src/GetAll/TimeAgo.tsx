import { FC, useMemo } from 'react'
import moment from 'moment'

type TimeAgo = {
   date: Date | string
}

export const TimeAgo: FC<TimeAgo> = ({ date }) => {
   const formattedDate = useMemo(() => {
      return moment(date).fromNow()
   }, [date])

   if (!formattedDate) return null
   return <div className="timeAgo"> {formattedDate}</div>
}
