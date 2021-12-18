import { Helmet } from 'react-helmet'
import { DungeonNode } from '.'
import styled from 'styled-components'
import { MouseEvent, useState } from 'react'

//@todo https://www.notion.so/dubsado/My-app-has-guts-what-is-a-component-basic-metaTraining-8559470f6bf040129b70430bba782f41

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 2rem 2rem 2rem 2rem;
    align-items: stretch;
`

const Input = styled.input`
    height: 2rem;
    margin: 0 0 0 1rem;
`

const Label = styled.label``

const Button = styled.button`
    height: 2rem;
    width: 100%;
`

const itemBorder = `dashed red thin`

const FormItem = styled.div`
    padding: 1rem 1rem 1rem 1rem;
    border: ${itemBorder};
    border-bottom: none;
    &:last-child {
        border-bottom: ${itemBorder};
    }
`

const NewNode = () => {
    const [loading, setLoading] = useState(false)

    const createNode = (e: MouseEvent) => {
        e.preventDefault()
        setLoading(true)
    }

    return (
        <Wrapper>
            <Helmet>
                <title>New Node</title>
            </Helmet>
            <FormItem>
                <Label>
                    Key:
                    <Input />
                </Label>
            </FormItem>
            <FormItem>
                <Label>
                    Message:
                    <Input />
                </Label>
            </FormItem>
            <FormItem>
                <Button disabled={loading} onClick={createNode}>
                    Create
                </Button>
            </FormItem>
        </Wrapper>
    )
}

export default NewNode
