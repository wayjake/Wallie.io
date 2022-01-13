import { useState } from 'react'
import styled from 'styled-components'
import { Styles, SimpleIconProps, stylesColors } from './'

const ITEM_BORDER = 'dashed #666600 thin'

const getColorFromStyle = (
    style: Styles = Styles.default,
    hovered: Boolean
) => {
    if (!hovered) {
        return stylesColors[Styles.default]
    }
    return stylesColors[style]
}

const StyledSimpleIcon = styled.div<{
    style: Styles
    hovered: Boolean
}>`
    display: flex;
    cursor: pointer;
    color: ${({ style, hovered }) => getColorFromStyle(style, hovered)};
    border: ${ITEM_BORDER};
    padding: 0rem 1rem 0rem 1rem;
    user-select: none;
    width: 3rem;
    align-items: center;
`

const SimpleIcon = ({ content, hoverContent, ...props }: SimpleIconProps) => {
    const [hovered, setHovered] = useState(false)

    const entered = () => {
        setHovered(true)
    }
    const left = () => {
        setHovered(false)
    }

    return (
        <StyledSimpleIcon
            onMouseEnter={entered}
            onMouseLeave={left}
            hovered={hovered}
            {...props}
        >
            <div>{hovered && hoverContent}</div>
            <div>{!hovered && content}</div>
        </StyledSimpleIcon>
    )
}

export default SimpleIcon
