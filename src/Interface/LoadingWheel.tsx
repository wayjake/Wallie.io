import styled from 'styled-components'
import { useEffect, useState } from 'react'

const animation_time = 100
const delimiter = '.'

const StyledLoadingWheel = styled.div`
    align-self: center;
    width: 1rem;
    padding: 0 0.6rem 0 0;
`

const LoadingWheel = () => {
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

    return <StyledLoadingWheel>{text}</StyledLoadingWheel>
}

export default LoadingWheel
