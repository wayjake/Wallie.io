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
    const posts = useListen(undefined, 'archive', false)
    const navigate = useNavigate()

    const postClicked = (key: string, metaIsPressed: boolean) => {
        if (!key) {
            throw new Error(`Key is expected in this function`)
        }
        navigate(`/post/${key}`)
    }

    return (
        <div>
            <Helmet>
                <title>Archive</title>
            </Helmet>
            {posts.map((post) => (
                <PostStyled
                    key={post.key}
                    onClick={(event) => {
                        postClicked(post.key, event.metaKey)
                    }}
                    dangerouslySetInnerHTML={createMarkup(post.content)}
                />
            ))}
        </div>
    )
}

export default ViewPostList
