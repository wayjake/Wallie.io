import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { DungeonNode, GunId, NewSubNode, NodeRow } from '.'
import {
    BackSectionWrapper,
    BackButton,
    NewNodeWrapper,
    ViewNode as ViewNodeStyled,
    Message,
    MessageDate,
    MessageTop,
    MessageWrapper,
    Username,
} from './ViewNode.styled'
import LoadingWheel from '../Interface/LoadingWheel'
import useKeyboard from '../utils/useKeyboard'
import { createMarkup, linkify } from '../utils'

/**
 *
 *          Why does the node have directions?
 *          this arose from thinking about being inside a dark forest / jungle
 *          without knowing where to go, what would you do? Like Hansel and
 *          Gretel we may leave little white pebbles through the forest
 *          to mark where we are. Each direction can be a new pebble
 *          which might remind you or the User about what you're doing here
 *          or why you're here.
 *
 */

const ViewNode = () => {
    const [node, setNode] = useState<DungeonNode | undefined>()
    const [directions, setDirections] = useState<any>({})
    const [showHidden, setShowHidden] = useState<Boolean>(false)
    const keypressed = useKeyboard(['h'])
    const { key = '' } = useParams()
    const navigate = useNavigate()
    //@TODO mark as viewed

    useEffect(() => {
        if (keypressed === 'h') {
            setShowHidden(!showHidden)
        }
    }, [keypressed])

    /**
     *    for when i make a new hook
     *    or when i write a new book
     *    REACT, THE PARTS THAT MATTER
     */
    useEffect(() => {
        setNode(undefined)
        const d = gun
            .get(namespace + '/node')
            .get(key)
            .on((node: DungeonNode | any = {}) => {
                setNode({ ...node })
            })
        return () => {
            d.off()
        }
    }, [key])

    /**
     *    WHY ARE THE "DIRECTIONS" HERE NOT
     *    LIVING DIRECTLY ON THE NODE ITSELF?
     *    well sir, that is because ________.
     */
    useEffect(() => {
        setDirections({})
        const d = gun
            .get(namespace + '/node')
            .get(key)
            .get('directions')
            .map()
            .on((message: any, key: any) => {
                if (!showHidden && message === null) {
                    return
                }
                setDirections((prev: any) => {
                    return { ...prev, [key]: message }
                })
            })
        return () => {
            d.off()
        }
    }, [key, showHidden])

    const pruneRight = (id: GunId) => {
        const newDirections = { ...directions }
        delete newDirections[id]
        setDirections(newDirections)

        gun.get(namespace + '/node')
            .get(key) // we're accessing the current top node and removing the direction by key
            .get(`directions`)
            .get(id)
            .put(null as any, (awk: any) => {
                console.log(awk)
            })
    }

    const nodeAdded = () => {
        console.log(`i'm in view node`)
    }

    const goback = () => {
        navigate(`/node/${node?.head}`)
    }

    const dateFormatted = useMemo(() => {
        if (!node?.date) return ''
        const date = new Date(node.date)

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }, [node?.date])

    return (
        <ViewNodeStyled>
            <Helmet>
                <title>View Node '{key.substring(0, 50)}'</title>
            </Helmet>

            <BackSectionWrapper className="blockSection">
                {node?.head && <BackButton onClick={goback}>{'< '}</BackButton>}
                {!node?.head && <div>&nbsp;</div>}
            </BackSectionWrapper>

            <MessageWrapper className="messageWrapper">
                <MessageTop className="messageTop">
                    {node?.user && <Username>@{node?.user}</Username>}
                    {!node?.user && <LoadingWheel />}
                    {dateFormatted && (
                        <MessageDate className="messageDate">
                            {dateFormatted}
                        </MessageDate>
                    )}
                    {!dateFormatted && <LoadingWheel />}
                </MessageTop>

                {node?.message && (
                    <Message
                        className="message"
                        dangerouslySetInnerHTML={createMarkup(node?.message)}
                    />
                )}

                {!node?.message && <LoadingWheel />}
            </MessageWrapper>

            {Object.keys(directions).map((key: string) => (
                <NodeRow
                    key={key}
                    directionKey={key}
                    directions={directions}
                    pruneRight={pruneRight}
                />
            ))}

            <NewNodeWrapper>
                <NewSubNode head={key} nodeAdded={nodeAdded} />
            </NewNodeWrapper>
        </ViewNodeStyled>
    )
}

export default ViewNode
