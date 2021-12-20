import { GunId, NewNode } from '.'
import styled from 'styled-components'
import { useState } from 'react'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: stretch;
    margin-top: 1rem;
`

const Button = styled.button`
    width: 100%;
    font-weight: 800;
    cursor: pointer;
    color: white;
    background-color: black;
    user-select: none;
    padding: 0.5rem 0.5rem;
    border-radius: 1rem;
    border: none;
    box-shadow: none;
`

const itemBorder = `dashed red thin`

const FormItem = styled.div`
    padding: 1rem 1rem 1rem 1rem;
    border: ${itemBorder};
    border-bottom: none;
    &:last-child {
        border-bottom: ${itemBorder};
    }
    &.error label {
        color: red;
    }
`

export type NewSubNodeProps = {
    head?: GunId
    nodeAdded: Function
}

const NewSubNode = ({ head }: NewSubNodeProps) => {
    const [pressed, setPressed] = useState(false)

    const nodeAdded = (data: any) => {
        console.log(data)
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
