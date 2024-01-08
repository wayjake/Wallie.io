import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, FormItem, Textarea } from '../Interface'
import useUpdate from '../api/useUpdate'
import { useNavigate } from 'react-router-dom'
import Tiptap from '../Interface/TipTap'
import styled from 'styled-components'

const NewPostStyled = styled.div`
   display: flex;
   flex-direction: column;
`

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
         navigate(`/blog/${node.key}`)
      }
   }, [loading, node])

   useEffect(() => {
      register('content', { required: true })
   }, [])

   return (
      <NewPostStyled>
         <Helmet>
            <title>New Post</title>
         </Helmet>

         <FormItem className={errors['title'] ? 'error' : ''}>
            <Label>
               Title:
               <Input {...register('title', { required: true })} />
            </Label>
         </FormItem>

         <FormItem
            className={errors['content'] ? 'error' : ''}
            flexDirection="column"
         >
            <Label>Content:</Label>I
            <Tiptap
               onChange={(value) => setValue('content', value)}
               content="<h1>Title</h1>"
            />
         </FormItem>

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

         <FormItem className={errors['description'] ? 'error' : ''}>
            <Label>
               Description:
               <Textarea {...register('description', { required: true })} />
            </Label>
         </FormItem>

         <FormItem className={errors['image'] ? 'error' : ''}>
            <Label>
               Image (url/blob):
               <Input {...register('image', { required: true })} />
            </Label>
         </FormItem>

         <Button
            disabled={loading || errors.length}
            onClick={handleSubmit(createNode)}
         >
            {!loading && 'Create'}
            {loading && 'Loading'}
         </Button>
      </NewPostStyled>
   )
}

export default NewPost
