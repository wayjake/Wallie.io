import { FC, useMemo } from 'react'
import moment from 'moment'

type TimeAgoProps = {
   date: Date | string | number
}

export const TimeAgo: FC<TimeAgoProps> = ({ date }) => {
   const formattedDate = useMemo(() => {
      return moment(date).fromNow()
   }, [date])

   if (!formattedDate) return null
   return <div className="timeAgo"> {formattedDate}</div>
}
