import { Helmet } from 'react-helmet'
import { DungeonNode } from '.'
import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeId } from './utilities'
import gun, { namespace } from '../gun'
import { useNavigate } from 'react-router-dom'
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
    &.error label {
        color: red;
    }
`

const NewNode = () => {
    const [loading, setLoading] = useState(false)
    const nodeRef = gun.get(
        namespace + 'node'
    ) /*is node (noun) plural? ;) #trickledown42*/
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    const createNode = (data: DungeonNode | any) => {
        console.log(data)
        if (!data) {
            return
        }
        setLoading(true)
        const key = data.key || makeId()
        delete data.key

        nodeRef.get(key).put({ ...data, user: makeId() }, () => {
            setLoading(false) // unecessary clean up lol
            navigate(`/node/${key}`)
        })
    }

    return (
        <Wrapper>
            <Helmet>
                <title>New Node</title>
            </Helmet>

            <FormItem>
                <Label>
                    Key:
                    <Input {...register('key')} />
                </Label>
            </FormItem>
            <FormItem className={errors['message'] ? 'error' : ''}>
                <Label>
                    Message:
                    <Input {...register('message', { required: true })} />
                </Label>
            </FormItem>
            <FormItem>
                <Button
                    disabled={loading || errors.length}
                    onClick={handleSubmit(createNode)}
                >
                    Create
                </Button>
            </FormItem>
        </Wrapper>
    )
}

export default NewNode
