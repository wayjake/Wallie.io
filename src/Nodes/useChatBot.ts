import { useEffect, useState } from 'react'

export type MovieLine = {
    lineId: string
    characterId: string
    movieId: string
    characterName: string
    text: string
}

export default function () {
    const [rawLines, setRawLines] = useState('')
    const [ip, setIp] = useState('')
    useEffect(() => {
        fetch('/chat.movie_lines.constant.txt')
            .then((r) => r.text())
            .then((text) => {
                setRawLines(text)
            })
    }, [])

    useEffect(() => {
        fetch('https://www.cloudflare.com/cdn-cgi/trace')
            .then((r) => r.text())
            .then((data) => {
                setIp(data.split('ip=')[1].split('\n')[0])
            })
            .catch((error) => console.error(error))
    }, [])

    return { rawLines, ip }
}
