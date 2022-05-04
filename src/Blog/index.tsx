import { Link, Outlet } from 'react-router-dom'
import logo from './wallie-logo-dark.png'
import styled from 'styled-components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getRandomFromArray } from '../utils'
import { createImportSpecifier } from 'typescript'
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
    display: flex;
    justify-content: center;
`

type Link = {
    path: string
    text: string
}
type DropdownProps = {
    links: Link[]
    children: React.ReactChild
}
const DropDownStyled = styled.div`
    padding: 7px 5px 7px 20px;
    position: relative;
    .top a {
        cursor: pointer;
    }
    a {
        white-space: nowrap;
        display: flex;
        min-width: 20px;
    }
    a:hover {
        color: black;
    }
    .dropdown {
        position: absolute;
        z-index: 3;
        display: flex;
        flex-direction: column;
        min-width: 100px;
        margin: 10px 0px 0px 0px;
        padding: 1px 20px 17px 20px;
        border-radius: 5px;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        a {
            margin: 10px 0 0 0;
        }
    }
`
export const DropDown = ({ links, children }: DropdownProps) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<any>(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    const topClicked = (e) => {
        e.preventDefault()
        setOpen((open) => !open)
    }

    return (
        <DropDownStyled
            ref={ref}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={(e) => setOpen(false)}
        >
            <div className="top">
                <a onClick={topClicked}>{children}</a>
            </div>
            {open && (
                <div className="dropdown">
                    {links.map(({ path, text }, index) => {
                        return (
                            <Link key={index} to={path}>
                                {text}
                            </Link>
                        )
                    })}
                </div>
            )}
        </DropDownStyled>
    )
}

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
    .nav {
        display: flex;
    }
`
export const TopBar = () => {
    const isLocalHost = useMemo(() => {
        return window.location.href.includes('localhost')
    }, [])

    const nodeText = useMemo(
        () => getRandomFromArray(['Node', 'Block', 'Wall']),
        []
    )
    const postText = useMemo(() => getRandomFromArray(['Post', 'Article']), [])

    return (
        <TopBarStyled>
            {' '}
            <Link to="/">
                {' '}
                <img src={logo} alt="Wallie Logo Dark" />{' '}
            </Link>
            <div className="nav">
                <DropDown
                    links={[
                        { path: `/post/new`, text: `New` },
                        { path: '/', text: 'Blog' },
                    ]}
                >
                    {postText}
                </DropDown>
                <DropDown
                    links={[
                        { path: `/node/new`, text: `New` },
                        { path: `/all`, text: `View all` },
                    ]}
                >
                    {nodeText}
                </DropDown>
                {isLocalHost && (
                    <DropDownStyled>
                        <Link to="/dashboard/wu1s4ic">CUR</Link>
                    </DropDownStyled>
                )}
            </div>
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
