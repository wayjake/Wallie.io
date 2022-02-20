import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import { useEffect, useState } from 'react'
import { GridNode } from '.'
import styled from 'styled-components'

const GRID_SIZE = {
    x: 10,
    y: 10,
}

type CellProps = {
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
const Cell = ({ x, y }: CellProps) => {
    return (
        <StyledCell style={{ left: x * cellSize.x, top: y * cellSize.y }}>
            <span className="top bracket">[</span>
            <span className="left bracket">[</span>
            <span className="content">{/* {x} {y} */}</span>
            <span className="right bracket">]</span>
            <span className="bottom bracket">]</span>
        </StyledCell>
    )
}

const Map = ({ children }) => {
    const StyledMap = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
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
    const [node, setNode] = useState<GridNode | undefined>()

    return (
        <>
            <Helmet>
                <title>THE WORLD SIM</title>
            </Helmet>

            <Map>
                {cells.map((cellProps, index) => (
                    <Cell {...cellProps} key={index} />
                ))}
            </Map>
        </>
    )
}

export default ViewMap
