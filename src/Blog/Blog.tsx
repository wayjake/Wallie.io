import { DungeonNode } from 'Nodes'
import { useEffect } from 'react'
import useListen from '../api/useListen'
import { createMarkup } from '../utils'
import usePostClicked from './usePostClicked'
import { PostStyled } from './ViewPost'

const GetPost = ({ id }) => {
   const post = useListen(id, 'post', true) as DungeonNode
   const postClicked = usePostClicked()

   if (!post) return null

   return (
      <PostStyled
         key={post.key}
         onClick={(event) => {
            postClicked(post.key, {
               metaKey: event.metaKey,
               altKey: event.altKey,
            })
         }}
         dangerouslySetInnerHTML={createMarkup(post.content as string)}
      />
   )
}

const ViewPostList = () => {
   const posts = useListen(undefined, 'post', true)

   useEffect(() => {
      document.title = `Blog`
   }, [])

   if (!posts) return null

   return (
      <div>
         {Object.keys(posts).map((key) => {
            if (key === 'key') return null
            if (key === '_') return null
            return <GetPost id={key} key={key} />
         })}
      </div>
   )
}

export default ViewPostList
