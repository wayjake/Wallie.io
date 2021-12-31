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
    cursor: pointer;
    color: ${({ style, hovered }) => getColorFromStyle(style, hovered)};
    border: ${ITEM_BORDER};
    padding: 1rem 1rem 0rem 1rem;
    user-select: none;
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
            {hovered && hoverContent}
            {!hovered && content}
        </StyledSimpleIcon>
    )
}

export default SimpleIcon
