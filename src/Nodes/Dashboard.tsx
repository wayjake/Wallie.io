import gun, { namespace } from '../gun'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { DungeonNode, GunId, NewSubNode, DashboardItem } from '.'
import {
    NewNodeWrapper,
    MessageDate,
    MessageTop,
    MessageWrapper,
    Username,
} from './ViewNode.styled'
import LoadingWheel from '../Interface/LoadingWheel'
import useKeyboard from '../utils/useKeyboard'
import { StartEnd } from './DashboardItem'
import TipTap from '../Interface/TipTap'
import useListen from '../GunApi/useListen'
import debounce from 'lodash.debounce'
import Time from './Time'
import styled from 'styled-components'

const DashboardView = ({ id }) => {
    const [directions, setDirections] = useState<DungeonNode[]>([])
    const [showHidden, setShowHidden] = useState<Boolean>(false)
    const [message, setMessage] = useState(' ')
    const keypressed = useKeyboard(['h'])
    const node = useListen(id, 'node', true)

    useEffect(() => {
        if (keypressed === 'h') {
            setShowHidden(!showHidden)
        }
    }, [keypressed])

    const sortDirections = (a: any, b: any): number => {
        return b.upVotes > a.upVotes ? 1 : -1
    }

    const insertDirection = (node: DungeonNode, key: string) => {
        setDirections((prev: DungeonNode[]) => {
            const withoutCurrent = prev.filter(
                (stateNode) => stateNode.id !== key
            )
            return [...withoutCurrent, { ...node, id: key }].sort(
                sortDirections
            )
        })
    }

    /**
     *    DIRTY DIRTY CODE
     */
    useEffect(() => {
        setDirections([])
        setMessage(' ')
        const directionListeners: any[] = []
        const d = gun
            .get(namespace + '/node')
            .get(id)
            .get('directions')
            .map()
            .on((message: any, key: string) => {
                if (!showHidden && message === null) {
                    return
                }
                const chain = gun
                    .get(namespace + '/node')
                    .get(key)
                    .once(insertDirection)
                directionListeners.push(chain)
            })
        return () => {
            d.off()
            directionListeners.map((chain) => chain.off())
        }
    }, [showHidden, id])

    const onMessageChange = (value: string) => {
        console.log(`setting value to message id:${id}`, value)
        gun.get(namespace + '/node')
            .get(id)
            .get('message')
            .put('' + value, (awk: any) => {
                console.log(`saved message`, awk)
            })
    }
    const debouncedOnMessageChange = useMemo(
        () => debounce(onMessageChange, 3000),
        [id]
    )

    useEffect(() => {
        return () => {
            debouncedOnMessageChange.cancel()
        }
    }, [id])

    const pruneRight = (idToDelete: GunId, fullDelete: boolean = false) => {
        setDirections(directions.filter((node) => node.id !== idToDelete))

        gun.get(namespace + '/node')
            .get(id)
            .get(`directions`)
            .get(idToDelete)
            .put(null as any, (awk: any) => {
                console.log(awk)
            })
        if (fullDelete) {
            console.log(`full delete`, fullDelete)
            gun.get(namespace + '/node')
                .get(idToDelete)
                .put(null as any, (awk: any) => {
                    console.log(`deleted node`, awk)
                })
        }
    }

    const nodeAdded = () => {
        console.log(`i'm in view node`)
    }

    const dateFormatted = useMemo(() => {
        if (!node?.date) return ''
        const date = new Date(node?.date)

        return `${date.toLocaleDateString()}`
    }, [node?.date])

    return (
        <>
            <div style={{ display: 'flex' }}>
                {/* <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(node, null, 3)}
                </pre> */}
                <Time
                    style={{ padding: '10px 30px 0 30px', maxWidth: '500px' }}
                />
            </div>
            <MessageWrapper className="messageWrapper">
                {node?.head && (
                    <Link to={`/dashboard/${node.head}`}>Parent</Link>
                )}
                <MessageTop className="messageTop">
                    <h2>
                        <Username>{node?.directionText}</Username>
                    </h2>
                    {!node?.user && <LoadingWheel />}
                    {dateFormatted && (
                        <MessageDate className="messageDate">
                            {dateFormatted}
                        </MessageDate>
                    )}
                    {!dateFormatted && <LoadingWheel />}
                </MessageTop>

                {node?.message && (
                    <>
                        <div style={{ marginTop: 10 }}>
                            <StartEnd {...node} />
                        </div>
                        <TipTap
                            onChange={debouncedOnMessageChange}
                            content={node.message}
                            hideFormatting={true}
                        />
                    </>
                )}

                {!node?.message && <LoadingWheel />}
            </MessageWrapper>

            {directions?.map((node, index) => (
                <DashboardItem
                    key={index}
                    id={node.id}
                    node={node}
                    pruneRight={pruneRight}
                />
            ))}

            <NewNodeWrapper>
                <NewSubNode
                    head={id}
                    nodeAdded={nodeAdded}
                    dashboardFeature={true}
                />
            </NewNodeWrapper>
        </>
    )
}

const DashboardStyled = styled.div`
    max-width: 1000px;
`

const Dashboard = () => {
    const { key } = useParams()
    useEffect(() => {
        document.title = `Dashboard ${key?.substring(0, 50)}`
    }, [key])
    return (
        <DashboardStyled>{key && <DashboardView id={key} />}</DashboardStyled>
    )
}

export default Dashboard
