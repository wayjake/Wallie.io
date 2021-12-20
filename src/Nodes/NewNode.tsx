import { Helmet } from 'react-helmet'
import { DungeonNode } from '.'
import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IdTypes, makeId } from './utilities'
import gun, { namespace } from '../gun'
import { useNavigate } from 'react-router-dom'
import { NewSubNodeProps } from './NewSubNode'
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
    flex: auto;
    & [readonly] {
        opacity: 0.4;
    }
`
const Textarea = styled.textarea`
    height: 4rem;
    margin: 0 0 0 1rem;
    flex: auto;
`

const Label = styled.label`
    display: flex;
    flex: auto;
`

const Button = styled.button`
    height: 2rem;
    width: 100%;
`

const itemBorder = `dashed red thin`

const FormItem = styled.div`
    display: flex;
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

const NewNode = (props: NewSubNodeProps) => {
    const [loading, setLoading] = useState(false)
    const nodeRef = gun.get(
        namespace + 'node'
    ) /*is node (noun) plural? ;) #trickledown42*/
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        if (props.head) {
            setValue('head', props.head)
        }
    }, [props.head])

    useEffect(() => {
        setValue('key', makeId(7, [IdTypes.lower, IdTypes.numbers]))
        setValue('user', makeId(5, [IdTypes.upper]))
    }, [])

    const createNode = (data: DungeonNode | any) => {
        if (!data) {
            return
        }
        setLoading(true)
        const key = data.key
        delete data.key

        nodeRef.get(key).put({ ...data, date: Date.now() }, (data) => {
            setLoading(false) // unecessary clean up lol
            navigate(`/node/${key}`)
            props.nodeAdded(data)
        })
    }

    const idLabelOptions = ['Node Id', 'Node Ref', 'Gun Id', 'Id', 'Key']
    const idLabel = useMemo(
        () => idLabelOptions[Math.floor(Math.random() * idLabelOptions.length)],
        idLabelOptions
    )
    const headLabelOptions = ['Head', 'Top', 'Parent', 'Up', 'Previous']
    const headLabel = useMemo(
        () =>
            headLabelOptions[
                Math.floor(Math.random() * headLabelOptions.length)
            ],
        headLabelOptions
    )

    return (
        <Wrapper>
            <Helmet>
                <title>New Node</title>
            </Helmet>

            <FormItem className={errors['key'] ? 'error' : ''}>
                <Label>
                    {idLabel}:
                    <Input {...register('key', { required: true })} />
                </Label>
            </FormItem>
            <FormItem className={errors['message'] ? 'error' : ''}>
                <Label>
                    Message:
                    <Textarea {...register('message', { required: true })} />
                </Label>
            </FormItem>
            <FormItem className={errors['user'] ? 'error' : ''}>
                <Label>
                    User:
                    <Input {...register('user', { required: true })} />
                </Label>
            </FormItem>

            {props?.head && (
                <FormItem>
                    <Label>
                        {headLabel}:
                        <Input readOnly {...register('head')} />
                    </Label>
                </FormItem>
            )}
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
