import { useEffect } from 'react'
import useListen from '../GunApi/useListen'
import { createMarkup } from '../utils'
import usePostClicked from './usePostClicked'
import { PostStyled } from './ViewPost'

const ViewPostList = () => {
    const posts = useListen(undefined, 'post', false)
    const postClicked = usePostClicked()

    useEffect(() => {
        document.title = `Blog`
    }, [])

    return (
        <div>
            {posts.map((post) => (
                <PostStyled
                    key={post.key}
                    onClick={(event) => {
                        postClicked(post.key, {
                            metaKey: event.metaKey,
                            altKey: event.altKey,
                        })
                    }}
                    dangerouslySetInnerHTML={createMarkup(post.content)}
                />
            ))}
        </div>
    )
}

export default ViewPostList
