import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import gun, { namespace } from '../gun'
import { SimpleIcon, Styles } from '../Interface'
import { ITEM_BORDER } from './ViewNode.styled'
import { GunId } from '.'
import { useState } from 'react'

export const LinkWrapper = styled.div`
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`

export const NodeLink = styled(Link)`
    padding: 1rem 1rem;
    margin: 0 1rem 0 0;
    border: ${ITEM_BORDER};
    flex-grow: 2;
`

type NodeRowProps = {
    key: string
    directionKey: string /* points to  👇 */
    directions: any /*              { [string]: string } 
                     i don't know how to say this in TS */
    pruneRight: (id: GunId) => void
}

const NodeRow = ({ directionKey, directions, pruneRight }: NodeRowProps) => {
    return (
        <LinkWrapper className="linkWrapper">
            <NodeLink
                to={`/node/${directionKey}`}
                key={directionKey}
                className="nodeLink"
            >
                {directions[directionKey] || `(missing key)`}
            </NodeLink>

            <SimpleIcon
                content="[ d ]"
                hoverContent={'[ prune ]'}
                style={Styles.warning}
                className="simpleIcon"
                onClick={() => {
                    pruneRight(directionKey)
                }}
            />
        </LinkWrapper>
    )
}

export default NodeRow
