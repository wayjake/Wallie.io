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

const FIXED_USERNAME = ``

/**
 * 
 * 
        async function encodeTest(message) {
            const key = 'i am a key'
            // Encrypt
            var ciphertext = CryptoJS.AES.encrypt(message, key).toString()
            console.log(`ciphertext`, ciphertext)

            // Decrypt
            var bytes = CryptoJS.AES.decrypt(ciphertext, key)
            var originalText = bytes.toString(CryptoJS.enc.Utf8)
            console.log(originalText) // 'my message
        }
        encodeTest('come on many')
 *
 */

const NewNode = (props: NewSubNodeProps) => {
   const [loading, setLoading] = useState(false)
   const [showAdvanced, showShowAdvanced] = useState(false)

   const nodeRef = gun.get(
      namespace + '/node'
   ) /*is node (noun) plural? ;) #trickledown42*/
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm()
   const navigate = useNavigate()
   const keypressed = useKeyboard(['v'])

   useEffect(() => {
      if (props.head) {
         setValue('head', props.head)
      }
   }, [props.head])

   useEffect(() => {
      document.title = `Something new!`
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
         const messagePreview =
            data.message.length > 142
               ? `${data.message.substring(0, 142)}...`
               : data.message
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
         setLoading(false)
      })
      if (!data.head) {
         navigate(`/node/${key}`)
      }
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
         <FormItem className={errors['directionText'] ? 'error' : ''}>
            <Input
               register={register}
               name={'directionText'}
               required={true}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Title'])}
            />
         </FormItem>
         <FormItem hidden={!props.dashboardFeature && !showAdvanced}>
            <Input
               register={register}
               name={'start'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Start', 'Pre'])}
            />
         </FormItem>

         <FormItem hidden={!props.dashboardFeature}>
            <Input
               register={register}
               name={'end'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['End', 'Post'])}
            />
         </FormItem>

         <FormItem className={errors['message'] ? 'error' : ''}>
            <Tiptap
               placeholder={'Message'}
               onChange={(value) => setValue('message', value)}
               content={''}
            />
         </FormItem>

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

         <FormItem hidden={!showAdvanced}>
            <Input
               register={register}
               name={'head'}
               onKeyPress={handleUserKeyPress}
               placeholder={getRandomFromArray(['Previous', 'Parent'])}
            />
         </FormItem>

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
