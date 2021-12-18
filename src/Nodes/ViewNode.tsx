import { Helmet } from 'react-helmet'

const ViewNode = () => {
    const titleText = ('' || 'hello world').substring(0, 50)
    return (
        <>
            <Helmet>
                <title>View Node '{titleText}'</title>
            </Helmet>
            wth mate
        </>
    )
}

export default ViewNode
