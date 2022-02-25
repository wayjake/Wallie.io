import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useListen from '../GunApi/useListen'
import useDelete from '../GunApi/useDelete'
import { createMarkup } from '../utils'

const PostStyled = styled.div`
    max-width: 520px;
    overflow-wrap: break-word;
`

const ViewPostList = () => {
    const posts = useListen(undefined, 'post', false)
    const [deleteNode] = useDelete('post', true)
    const navigate = useNavigate()

    const postClicked = (key: string, { metaKey, altKey }) => {
        if (!key) {
            throw new Error(`Key is expected in this function`)
        }
        if (metaKey) {
            const confirmationText =
                'Are you sure you would like to delete this post?'
            if (window.confirm(confirmationText) == true) {
                deleteNode(key)
            }
            return
        }
        if (altKey) {
            navigate(`/post/edit/${key}`)
            return
        }
        navigate(`/post/${key}`)
    }

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
