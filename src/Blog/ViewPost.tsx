import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import useListen from '../GunApi/useListen'
import { createMarkup } from '../utils'

const ViewPost = () => {
    const { key = '' } = useParams()
    const post = useListen(key, 'post', true)

    console.log(post)
    return (
        <div>
            <Helmet>
                <title>I am a post!</title>
            </Helmet>
            <div dangerouslySetInnerHTML={createMarkup(post)}></div>
        </div>
    )
}

export default ViewPost
