import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useListen from '../api/useListen'
import { createMarkup } from '../utils'
import usePostClicked from './usePostClicked'
import { getRandomFromArray } from '../utils'
import { DungeonNode } from 'Nodes'

export const PostStyled = styled.div<{ borderColor?: string }>`
   max-width: 700px;
   overflow-wrap: break-word;
   border: dashed thin ${({ borderColor }) => borderColor || ''};
   margin: 10px 0px 10px 0px;
   padding: 10px;
`

/*
#3ed3c9
#f8633c
#5970cd
#f4d400
*/

const colors = ['#3ed3c9', '#f8633c', '#5970cd', '#f4d400']

const ViewPost: React.FC = () => {
   const { key = '' } = useParams()
   const [tempContent, setTempContent] = useState<string>(null!)
   const post = useListen(key, 'post', true) as DungeonNode
   const postClicked = usePostClicked()
   const borderColor: string = useMemo(
      () => getRandomFromArray(colors),
      [post?.title]
   )

   const getPreloadData = (): void => {
      const content: HTMLMetaElement | null = document.querySelector(
         'meta[name="content"]'
      )
      if (!content?.content) {
         return
      }
      setTempContent(decodeURI(content?.content))
   }

   useEffect(() => {
      const description: HTMLMetaElement | null = document.querySelector(
         'meta[name="description"]'
      )
      if (description?.content === `__META_OG_DESCRIPTION__`) {
         // if the SSR is in effect, this field will be altered from the template html file
         document.title = post?.title || 'Title is missing'
      } else {
         getPreloadData()
      }
   }, [post?.title])

   return (
      <div>
         <PostStyled
            key={post?.key}
            dangerouslySetInnerHTML={createMarkup(post?.content || tempContent)}
            borderColor={borderColor}
            onClick={(event) => {
               postClicked(key, {
                  metaKey: event.metaKey,
                  altKey: event.altKey,
               })
            }}
         />
      </div>
   )
}

export default ViewPost
