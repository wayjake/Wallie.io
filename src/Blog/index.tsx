import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import TopBar from './TopBar'

export { default as ViewPost } from './ViewPost'
export { default as NewPost } from './NewPost'
export { default as TopBar } from './TopBar'
export { default as ViewPostList } from './Blog'

export type Post = {
   slug: string
   user: string
   content: string
}

const StyledBlogWrapper = styled.div`
   display: flex;
   justify-content: center;
   @media only screen and (min-width: 600px) {
      padding: 1rem 2rem 2rem 2rem;
   }
`

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
