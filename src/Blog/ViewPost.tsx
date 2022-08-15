import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useListen from '../GunApi/useListen'
import { createMarkup } from '../utils'
import usePostClicked from './usePostClicked'
import { getRandomFromArray } from '../utils'

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
    const post = useListen(key, 'post', true)
    const postClicked = usePostClicked()
    const borderColor: string = useMemo(
        () => getRandomFromArray(colors),
        [post?.title]
    )
    useEffect(() => {
        document.title = post?.title || 'Title is missing'
    }, [post?.title])

    return (
        <div>
            <PostStyled
                key={post?.key}
                dangerouslySetInnerHTML={createMarkup(post?.content)}
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
