import { useState } from 'react'
import { NewNode } from '.'
import { NewSubNodeProps, Wrapper, FormItem, Button } from './NewSubNode.styled'

const NewSubNode = ({ head }: NewSubNodeProps) => {
    const [pressed, setPressed] = useState(false)

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
                    <FormItem>
                        <NewNode head={head} nodeAdded={nodeAdded} />
                    </FormItem>
                    <FormItem>
                        <Button onClick={() => setPressed(false)}>
                            Cancel
                        </Button>
                    </FormItem>
                </>
            )}
        </Wrapper>
    )
}

export default NewSubNode
