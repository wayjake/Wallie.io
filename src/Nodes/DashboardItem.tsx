import styled from 'styled-components/macro'
import { Link, useNavigate } from 'react-router-dom'
import { SimpleIcon, Styles } from '../Interface'
import { ITEM_BORDER } from './ViewNode.styled'
import { DungeonNode, GunId } from '.'
import useUpdate from '../GunApi/useUpdate'

export const NodeLink = styled(Link)`
    padding: 1rem 1rem;
    margin: 0 1rem 0 0;
    border: ${ITEM_BORDER};
    flex-grow: 2;
`

type NodeRowProps = {
    key: string | number
    id: string
    node: DungeonNode
    pruneRight: (id: GunId, fullDelete?: boolean) => void
    onUpdate: (node: DungeonNode, key: GunId) => void
}

const StartEndStyed = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 1px 20px 1px 5px;
    width: 20%;
    max-width: 10rem;
    justify-content: space-between;
`
type StartEndProps = {
    start: string
    end: string
}
export const StartEnd = ({ start, end }: StartEndProps) => {
    if (!start && !end) return null
    return (
        <StartEndStyed>
            <div>{start && start}</div>
            <div>{start && end && '-'}</div>
            <div>{end && end}</div>
        </StartEndStyed>
    )
}

const Tools = styled.div`
    display: flex;
    justify-content: end;
    align-items: flex-start;
    .simpleIcon {
        border: none;
    }
`

const Title = styled.div`
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
`

const MessageStyled = styled.div`
    flex: 1;
`
const Message = ({ message }: Pick<DungeonNode, 'message'>) => {
    return <MessageStyled dangerouslySetInnerHTML={{ __html: message }} />
}

export const LinkWrapper = styled.div`
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${MessageStyled} {
        margin-bottom: 0px;
    }
`

const DashboardItem = ({ id, pruneRight, node, onUpdate }: NodeRowProps) => {
    const [createNode] = useUpdate('node')
    const navigate = useNavigate()

    const itemClicked = (id: string) => {
        if (id) {
            navigate(`/dashboard/${id}`)
        }
    }

    const upVote = (node) => {
        const upVotes = node?.upVotes ? node?.upVotes + 1 : 1
        onUpdate({ ...node, upVotes }, id)
        createNode({ key: id, upVotes })
    }

    return (
        <LinkWrapper className="linkWrapper">
            <StartEnd {...node} />

            <div style={{ flex: 1 }}>
                <Title onClick={() => itemClicked(id)}>
                    {node.directionText || `(missing key)`}
                </Title>

                <Message message={node.message} />
            </div>
            <Tools>
                {node?.upVotes}
                <SimpleIcon
                    content="[ ⇧ ]"
                    hoverContent={'[ ⇧ ]'}
                    style={Styles.positive}
                    className="simpleIcon"
                    onClick={() => {
                        upVote(node)
                    }}
                />
                {/* <SimpleIcon
                    content="[ ⇩ ]"
                    hoverContent={'[ ⇩ ]'}
                    style={Styles.positive}
                    className="simpleIcon"
                    onClick={() => {}}
                /> */}
                <SimpleIcon
                    content="[ ␡ ]"
                    hoverContent={'[ ␡ ]'}
                    style={Styles.warning}
                    className="simpleIcon"
                    onClick={(event: MouseEvent) => {
                        if (event.metaKey) pruneRight(id, true)
                        pruneRight(id)
                    }}
                />
                {/* <SimpleIcon
                    content="[ ✎ ]"
                    hoverContent={'[ ✎ ]'}
                    style={Styles.positive}
                    className="simpleIcon"
                    onClick={() => {}}
                /> */}
            </Tools>
        </LinkWrapper>
    )
}

export default DashboardItem
