import { Link, Outlet } from 'react-router-dom'
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
    padding: 1rem 2rem 2rem 2rem;
`

const TopBarStyled = styled.div`
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

    padding: 8px 6px 2px 15px;
    display: flex;
    img {
        height: 25px;
        padding-bottom: 5px;
        padding-top: 5px;
        padding-left: 16px;
    }
    .beta {
        transform: rotate(180deg);
        color: #f8633c;
        font-weight: bold;
        font-size: 10px;
        font-style: italic;
        margin-left: 3px;
        margin-bottom: 8px;
    }
`

const TopBar = () => {
    return (
        <TopBarStyled>
            {' '}
            <Link to="/">
                {' '}
                <img src={logo} alt="Wallie Logo Dark" />{' '}
            </Link>
            <div className="beta">ATEB</div>
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
