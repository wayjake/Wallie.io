import { useEffect, useState } from 'react'

const animation_time = 500
const delimiter = '.'

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

    return <>{text}</>
}

export default LoadingWheel
