import { FC } from 'react'
import styled from 'styled-components'

export type Player = {
    key: string
    x: number
    y: number
    color: string
}

const StyledPlayer = styled.div`
    color: white;
    background: black;
`
export const Player: FC<Player> = ({ color }) => {
    return (
        <StyledPlayer style={{ background: color }}>
            <span className="content">()</span>
        </StyledPlayer>
    )
}
