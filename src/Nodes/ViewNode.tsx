import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MessageWrapper = styled.div`
    padding: 2rem;
`
const Username = styled.div`
    font-weight: 600;
`

const Message = styled.div``

const LinkWrapper = styled.div``

const NodeLink = styled(Link)``

const Button = styled.button`
    font-weight: 600;
`

const ViewNode = () => {
    const titleText = ('' || 'hello world').substring(0, 50)
    return (
        <>
            <Helmet>
                <title>View Node '{titleText}'</title>
            </Helmet>
            <MessageWrapper>
                <Username>{'username'}:</Username>
                <Message>{'message'}</Message>
            </MessageWrapper>
            <LinkWrapper>
                <NodeLink to={`/node/${'key'}`}>{'key'}</NodeLink>
            </LinkWrapper>
            <Button>New</Button>
        </>
    )
}

export default ViewNode
