import { Helmet } from 'react-helmet'
import { ReactNode, useEffect, useState } from 'react'
import { Cell, CellProps } from './Cell'
import styled from 'styled-components'
import { Player } from './Player'
import useKeyboard from '../utils/useKeyboard'
import { getDarkColor } from '../utils'
import { useQueryState } from '../utils/useQueryState'
import useUpdate from '../GunApi/useUpdate'
import useListen from '../GunApi/useGet'
import { usePlayer } from './usePlayer'

const GRID_SIZE = {
    x: 10,
    y: 10,
}

const Map = ({ children }) => {
    const StyledMap = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        margin-left: 15px;
    `
    return <StyledMap>{children}</StyledMap>
}

const cells: CellProps[] = []
for (let y = 0; y < GRID_SIZE.y; y++) {
    for (let x = 0; x < GRID_SIZE.x; x++) {
        cells.push({ x, y })
    }
}

const ViewMap = () => {
    const keypressed = useKeyboard(['a', 's', 'd', 'w'])
    const { username } = useQueryState()
    const { player, setPlayer } = usePlayer(username)

    useEffect(() => {
        switch (keypressed) {
            case 'a':
                setPlayer((player) => {
                    return { ...player, x: player?.x - 1 }
                })
                break
            case 's':
                setPlayer((player) => {
                    return { ...player, y: player.y + 1 }
                })
                break
            case 'd':
                setPlayer((player) => {
                    return { ...player, x: player.x + 1 }
                })
                break
            case 'w':
                setPlayer((player) => {
                    return { ...player, y: player.y - 1 }
                })
                break
        }
    }, [keypressed])

    return (
        <>
            <Helmet>
                <title>THE WORLD SIM</title>
            </Helmet>
            <pre>{JSON.stringify(player)}</pre>

            <Map>
                {cells.map((cellProps, index) => {
                    const children: ReactNode[] = []
                    if (cellProps.x === player?.x && cellProps.y === player.y) {
                        children.push(<Player {...player} />)
                    }
                    return (
                        <Cell {...cellProps} key={index}>
                            {children}
                        </Cell>
                    )
                })}
            </Map>
        </>
    )
}

export default ViewMap
