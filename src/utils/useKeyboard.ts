import { useState, useEffect } from 'react'

const useKeyboard = (targetKey: string[]): string | undefined => {
    const [keyPressed, setKeyPressed] = useState<string | undefined>('')

    const downHandler = ({ key }: KeyboardEvent): void => {
        if (targetKey.includes(key)) {
            setKeyPressed(key)
        }
    }

    const upHandler = ({ key }: KeyboardEvent): void => {
        if (targetKey.includes(key)) {
            setKeyPressed(undefined)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return keyPressed
}

export default useKeyboard
