import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, FormItem } from '../Interface'
import './prismTheme.css'
import useUpdate from '../GunApi/useUpdate'
import { useNavigate } from 'react-router-dom'
import Tiptap from '../Interface/TipTap'

const NewPost = () => {
    const [createNode, loading, node] = useUpdate('post')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (!loading && node) {
            navigate(`/post/${node.key}`)
        }
    }, [loading, node])

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
                <Label>
                    Content:
                    {/*<Textarea
                        {...register('content', {
                            required: true,
                        })}
                    />*/}
                    {/*<Editor
                        editorState={getValues('content')}
                        onChange={(value) => setValue('content', value)}
                    />*/}
                    {/*<ReactQuill
                        style={{
                            flex: 'auto',
                            flexDirection: 'column',
                            marginLeft: 10,
                            minHeight: '11rem',
                            paddingBottom: '3remo',
                        }}
                        value={getValues('content')}    
                        onChange={(value) => setValue('content', value)}
                    />*/}
                </Label>
            </FormItem>
            <Tiptap
                // value={getValues('content')}
                onChange={(value) => setValue('content', value)}
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
