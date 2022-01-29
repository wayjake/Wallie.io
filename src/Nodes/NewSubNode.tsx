import { useEffect, useState } from 'react'
import { NewNode } from '.'
import useKeyboard from '../utils/useKeyboard'
import {
    NewSubNodeProps,
    Wrapper,
    FormItem,
    Button,
    CancelButton,
} from './NewSubNode.styled'

const NewSubNode = ({ head }: NewSubNodeProps) => {
    const [pressed, setPressed] = useState(false)
    const keypressed = useKeyboard(['r', 'c'])

    useEffect(() => {
        if (keypressed === 'r') {
            setPressed(true)
        }
        if (keypressed === 'c') {
            setPressed(false)
        }
    }, [keypressed])

    const nodeAdded = (data: any) => {
        setPressed(false)
    }

    return (
        <Wrapper>
            {!pressed && (
                <FormItem>
                    <Button onClick={() => setPressed(true)}>New</Button>
                </FormItem>
            )}

            {pressed && (
                <>
                    <CancelButton onClick={() => setPressed(false)}>
                        X
                    </CancelButton>
                    <FormItem>
                        <NewNode head={head} nodeAdded={nodeAdded} />
                    </FormItem>
                </>
            )}
        </Wrapper>
    )
}

export default NewSubNode
