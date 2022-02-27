import { Outlet } from 'react-router-dom'
import logo from './wallie-logo-dark.png'
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
    padding: 0 2rem;
`

const TopBarStyled = styled.div`
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

    padding: 8px 6px 2px 15px;
    display: flex;
    img {
        height: 30px;
        padding-bottom: 5px;
    }
    .beta {
        color: #f8633c;
        font-weight: bold;
        font-size: 10px;
        font-style: italic;
        margin-left: 3px;
        margin-top: 1px;
    }
`

const TopBar = () => {
    return (
        <TopBarStyled>
            {' '}
            <img src={logo} alt="Wallie Logo Dark" />{' '}
            <div className="beta">BETA</div>
        </TopBarStyled>
    )
}

export const BlogWrapper = () => {
    return (
        <>
            <TopBar />

            <StyledBlogWrapper className="styled-blog">
                <Outlet />
            </StyledBlogWrapper>
        </>
    )
}
