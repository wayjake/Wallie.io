import { useNavigate } from 'react-router-dom'
import useDelete from '../GunApi/useDelete'

const usePostClicked = () => {
    const [deleteNode] = useDelete('post', true)
    const navigate = useNavigate()

    const postClicked = (key: string, { metaKey, altKey }) => {
        if (!key) {
            throw new Error(`Key is expected in this function`)
        }
        if (metaKey) {
            const confirmationText =
                'Are you sure you would like to delete this post?'
            if (window.confirm(confirmationText) == true) {
                deleteNode(key)
            }
            return
        }
        if (altKey) {
            navigate(`/post/edit/${key}`)
            return
        }
        navigate(`/blog/${key}`)
    }

    return postClicked
}

export default usePostClicked
