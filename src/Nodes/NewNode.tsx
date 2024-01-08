import { DungeonNode, GunId } from '.'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { getRandomUsername, IdTypes, makeId } from '../utils'
import Tiptap from '../Interface/TipTap'
import { getRandomFromArray } from '../utils'
import { Wrapper, FormItem } from './NewNode.styled'
import useKeyboard from '../utils/useKeyboard'
import Input from '../Interface/Input'
import { Button, Label, Textarea } from 'Interface'
import { useCreateNode } from './useCreateNode'

export type NewSubNodeProps = {
   head?: GunId
   dashboardFeature?: boolean
   nodeAdded: (node: DungeonNode) => void
}

const NewNode = (props: NewSubNodeProps) => {
   const [showAdvanced, showShowAdvanced] = useState(false)
   const [createNode, loading] = useCreateNode(props.nodeAdded)

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm()
   const keypressed = useKeyboard(['v'])

   useEffect(() => {
      document.title = `Something new!`
      setValue('head', props.head || null)
      setValue('message', undefined)
      setValue('id', makeId(7, [IdTypes.lower, IdTypes.numbers]))
      setValue('user', getRandomUsername())
   }, [])

   useEffect(() => {
      if (keypressed === 'v') {
         showShowAdvanced((showAdvanced) => !showAdvanced)
      }
   }, [keypressed])

   const handleUserKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         handleSubmit(createNode as SubmitHandler<FieldValues>)()
      }
   }

   return (
      <Wrapper>
         {/* Subject line */}
         <FormItem
            hidden={!!props.head}
            className={errors['directionText'] ? 'error' : ''}
         >
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
               autoFocus={true}
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
            className={errors['id'] ? 'error' : ''}
         >
            <Input
               register={register}
               name={'id'}
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
               /* @ts-ignore */
               disabled={loading || errors.length}
               onClick={handleSubmit(createNode as SubmitHandler<FieldValues>)}
            >
               {getRandomFromArray(['Add', 'Create'])}
            </Button>
         </FormItem>
      </Wrapper>
   )
}

export default NewNode
