import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useListen from '../GunApi/useListen'
import { createMarkup } from '../utils'

const PostStyled = styled.div`
    max-width: 520px;
`

const ViewPost = () => {
    const { key = '' } = useParams()
    const post = useListen(key, 'post', true)

    console.log(post)
    return (
        <div>
            <Helmet>
                <title>I am a post!</title>
            </Helmet>
            <PostStyled dangerouslySetInnerHTML={createMarkup(post)} />
        </div>
    )
}

export default ViewPost
