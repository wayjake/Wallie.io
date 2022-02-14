import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import { useEffect, useState } from 'react'
import { GridNode } from '.'

const ViewMap = () => {
    const [node, setNode] = useState<GridNode | undefined>()

    return (
        <>
            <Helmet>
                <title>Map Game!</title>
            </Helmet>
        </>
    )
}

export default ViewMap
