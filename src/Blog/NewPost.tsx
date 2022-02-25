import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, FormItem } from '../Interface'
import useUpdate from '../GunApi/useUpdate'
import { useNavigate } from 'react-router-dom'
import Tiptap from '../Interface/TipTap'

const NewPost = () => {
    const [createNode, loading, node] = useUpdate('post')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (!loading && node) {
            navigate(`/post/${node.key}`)
        }
    }, [loading, node])

    register('content', { required: true })

    return (
        <>
            <Helmet>
                <title>New Post</title>
            </Helmet>

            <FormItem className={errors['key'] ? 'error' : ''}>
                <Label>
                    Slug:
                    <Input
                        {...register('key', {
                            required: true,
                            validate: {
                                nospaces: (value) =>
                                    !value.match(/\s/) ||
                                    'The url should not contain spaces.',
                            },
                        })}
                    />
                </Label>
            </FormItem>

            <FormItem className={errors['content'] ? 'error' : ''}>
                <Label>Content:</Label>
            </FormItem>
            <Tiptap
                onChange={(value) => setValue('content', value)}
                content="Start typing here..."
            />

            <Button
                disabled={loading || errors.length}
                onClick={handleSubmit(createNode)}
            >
                {!loading && 'Create'}
                {loading && 'Loading'}
            </Button>
        </>
    )
}

export default NewPost
