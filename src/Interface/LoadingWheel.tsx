import styled from 'styled-components'
import { FC, useEffect, useState } from 'react'

const animation_time = 100
const delimiter = '.'

const StyledLoadingWheel = styled.div`
   align-self: center;
   width: 1rem;
   padding: 0 0.6rem 0 0;
`

const LoadingWheel: FC<{ className?: string }> = ({ className }) => {
   const [text, setText] = useState<string>(delimiter)

   useEffect(() => {
      const intervalId = setInterval(() => {
         setText((curVal: string) => {
            if (curVal.lastIndexOf(delimiter) > 1) return delimiter
            return curVal + delimiter
         })
      }, animation_time)
      return () => {
         clearInterval(intervalId)
      }
   }, [])

   return <StyledLoadingWheel className={className}>{text}</StyledLoadingWheel>
}

export default LoadingWheel
