import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, FormItem, Textarea } from '../Interface'
import useUpdate from '../GunApi/useUpdate'
import { useNavigate } from 'react-router-dom'
import Tiptap from '../Interface/TipTap'
import useGet from '../GunApi/useGet'
import { useParams } from 'react-router-dom'
import LoadingWheel from '../Interface/LoadingWheel'

const EditPost = () => {
    const [createNode, loading, node] = useUpdate('post')
    const params = useParams()
    const key = params.key
    const post = useGet(key, 'post', true)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (!loading && node) {
            navigate(`/blog/${node.key}`)
        }
    }, [loading, node])

    useEffect(() => {
        if (!post) {
            return
        }
        setValue('content', post.content)
        setValue('key', post.key)
        setValue('title', post.title)
        setValue('description', post.description)
        setValue('image', post.image)
    }, [post])

    if (!post) {
        return (
            <>
                <Helmet>
                    <title>Edit Post</title>
                </Helmet>
                Loading
                <LoadingWheel />
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Edit Post {post?.key}</title>
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

            <FormItem className={errors['title'] ? 'error' : ''}>
                <Label>
                    Title:
                    <Input {...register('title', { required: true })} />
                </Label>
            </FormItem>

            <FormItem className={errors['description'] ? 'error' : ''}>
                <Label>
                    Description:
                    <Textarea
                        {...register('description', { required: true })}
                    />
                </Label>
            </FormItem>

            <FormItem className={errors['image'] ? 'error' : ''}>
                <Label>
                    Image (url/blob):
                    <Input {...register('image', { required: true })} />
                </Label>
            </FormItem>

            <FormItem className={errors['content'] ? 'error' : ''}>
                <Label>Content:</Label>
            </FormItem>
            <Tiptap
                onChange={(value) => setValue('content', value)}
                content={post.content}
            />

            <Button
                disabled={loading || errors.length}
                onClick={handleSubmit(createNode)}
            >
                {!loading && 'Save'}
                {loading && 'Loading'}
            </Button>
        </>
    )
}

export default EditPost
