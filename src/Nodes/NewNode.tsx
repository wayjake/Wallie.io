import { DungeonNode } from '.'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getRandomUsername, IdTypes, makeId, userIsWithinInput } from '../utils'
import gun, { namespace } from '../GunApi/gun'
import { useNavigate } from 'react-router-dom'
import { NewSubNodeProps } from './NewSubNode.styled'
import Tiptap from '../Interface/TipTap'
import { getRandomFromArray } from '../utils'
import { Wrapper, FormItem, Label, Button } from './NewNode.styled'
import useKeyboard from '../utils/useKeyboard'
import Input from '../Interface/Input'
import DOMPurify from 'dompurify'
import { Textarea } from 'Interface'

const NewNode = (props: NewSubNodeProps) => {
   const [loading, setLoading] = useState(false)
   const [showAdvanced, showShowAdvanced] = useState(false)

   const nodeRef = gun.get(namespace + '/node')
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm()
   const navigate = useNavigate()
   const keypressed = useKeyboard(['v'])

   useEffect(() => {
      document.title = `Something new!`
      setValue('head', props.head)
      setValue('message', undefined)
      setValue('key', makeId(7, [IdTypes.lower, IdTypes.numbers]))
      setValue('user', FIXED_USERNAME || getRandomUsername())
   }, [])

   useEffect(() => {
      if (keypressed === 'v') {
         showShowAdvanced((showAdvanced) => !showAdvanced)
      }
   }, [keypressed])

   const createNode = async (data: DungeonNode | any) => {
      if (!data) {
         return
      }
      setLoading(true)
      // let's get to work!
      // await createNode(data)

      const key = data.key
      delete data.key
      /* this is business logic that I'd like to make dissappear */
      if (data.head) {
         const messagePreview = DOMPurify.sanitize(data.message, {
            ALLOWED_TAGS: ['b', 'i'],
         })
         nodeRef
            .get(data.head)
            .get('directions')
            .get(key)
            .put(data.directionText || messagePreview, (ack) => {
               console.log(`added message preview`)
            })
      }
      const newNode = { ...data, date: Date.now() }
      nodeRef.get(key).put(newNode, (ack) => {
         if (!data.head) {
            return navigate(`/node/${key}`)
         }
         setLoading(false)
      })
      props.nodeAdded(newNode)
   }

   const handleUserKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         handleSubmit(createNode)()
         e.preventDefault()
      }
   }

   return (
      <Wrapper>
         {/* Subject line */}
         <FormItem className={errors['directionText'] ? 'error' : ''}>
            <Input
               register={register}
               name={'directionText'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Title'])}
            />
         </FormItem>

         {/* Start (if in dashboard mode) */}
         <FormItem hidden={!props.dashboardFeature && !showAdvanced}>
            <Input
               register={register}
               name={'start'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Start', 'Pre'])}
            />
         </FormItem>
         {/* End (if in dashboard mode) */}
         <FormItem hidden={!props.dashboardFeature}>
            <Input
               register={register}
               name={'end'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['End', 'Post'])}
            />
         </FormItem>
         {/* Message (if in reply mode) */}
         <FormItem
            hidden={!props.head}
            className={errors['message'] ? 'error' : ''}
         >
            <Textarea
               onChange={(event) => setValue('message', event.target.value)}
               name={'message'}
               onKeyPress={handleUserKeyPress}
               placeholder={'what are your thoughts?'}
            />
         </FormItem>
         {/* Message (if in parent mode) */}
         <FormItem
            hidden={!!props.head}
            className={errors['message'] ? 'error' : ''}
         >
            <Tiptap
               placeholder={'Message'}
               onChange={(value) => setValue('message', value)}
               content={''}
            />
         </FormItem>
         {/*  ID */}
         <FormItem
            hidden={showAdvanced}
            className={errors['key'] ? 'error' : ''}
         >
            <Input
               register={register}
               name={'end'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Id', 'HashKey', 'Path'])}
            />
         </FormItem>
         {/* Head */}
         <FormItem hidden={!showAdvanced}>
            <Input
               register={register}
               name={'head'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Previous', 'Parent'])}
            />
         </FormItem>
         {/* User */}
         <FormItem className={errors['user'] ? 'error' : ''}>
            <Input
               register={register}
               name={'user'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray([
                  'User ID',
                  'Username',
                  'Handle',
               ])}
            />
         </FormItem>
         {/* Submit */}
         <FormItem>
            <Button
               disabled={loading || errors.length}
               onClick={handleSubmit(createNode)}
            >
               {getRandomFromArray(['Add', 'Create'])}
            </Button>
         </FormItem>
      </Wrapper>
   )
}

export default NewNode
