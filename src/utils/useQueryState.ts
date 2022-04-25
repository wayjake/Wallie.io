import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryState = () => {
    const { search } = useLocation()
    const query = useMemo(() => new URLSearchParams(search), [search])
    const [username, setUsername] = useState<string | null>(
        query.get('username')
    )

    useEffect(() => {
        setUsername(query.get('username'))
    }, [search])

    return { username, query }
}
