import { FC } from 'react'
import styled from 'styled-components'

export type CellProps = {
    x: number
    y: number
}
const cellSize = {
    x: 60,
    y: 40,
}
const StyledCell = styled.div`
    width: ${cellSize.x}px;
    height: ${cellSize.y}px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: yellow;
    .bracket {
        position: absolute;
    }
    .top.bracket {
        top: 0px;
        left: ${cellSize.x / 2}px;
        transform: rotate(90deg);
    }
    .bottom.bracket {
        bottom: -0px;
        left: ${cellSize.x / 2}px;
        transform: rotate(90deg);
    }
    .left.bracket {
        left: 12px;
    }
    .right.bracket {
        right: 12px;
    }
`
export const Cell: FC<CellProps> = ({ x, y, children }) => {
    return (
        <StyledCell style={{ left: x * cellSize.x, top: y * cellSize.y }}>
            <span className="top bracket">[</span>
            <span className="left bracket">[</span>
            <span className="content">{children}</span>
            <span className="right bracket">]</span>
            <span className="bottom bracket">]</span>
        </StyledCell>
    )
}
