import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import useListen from '../GunApi/useListen'
import { createMarkup } from '../utils'
import usePostClicked from './usePostClicked'

const PostStyled = styled.div`
    max-width: 520px;
    overflow-wrap: break-word;
`

const ViewPostList = () => {
    const posts = useListen(undefined, 'post', false)
    const postClicked = usePostClicked()

    return (
        <div>
            <Helmet>
                <title>Blog</title>
            </Helmet>
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
