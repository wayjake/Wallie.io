import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useListen from '../GunApi/useListen'
import { createMarkup } from '../utils'
import usePostClicked from './usePostClicked'

const PostStyled = styled.div`
    max-width: 520px;
    overflow-wrap: break-word;
`

const ViewPost = () => {
    const { key = '' } = useParams()
    const post = useListen(key, 'post', true)
    const postClicked = usePostClicked()

    return (
        <div>
            <Helmet>
                <title>{post?.title || 'title is missing'}</title>
            </Helmet>
            <PostStyled
                key={post?.key}
                dangerouslySetInnerHTML={createMarkup(post?.content)}
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
