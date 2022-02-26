import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
export { default as ViewPost } from './ViewPost'
export { default as NewPost } from './NewPost'
export { default as ViewPostList } from './Blog'

export type Post = {
    slug: string
    user: string
    content: string
}

const StyledBlogWrapper = styled.div`
    @media (max-width: 600px) {
        padding: 2rem;
    }
`

export const BlogWrapper = () => {
    return (
        <StyledBlogWrapper className="styled-blog">
            <Outlet />
        </StyledBlogWrapper>
    )
}
