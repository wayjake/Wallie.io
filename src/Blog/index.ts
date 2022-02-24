export { default as ViewPost } from './ViewPost'
export { default as NewPost } from './NewPost'

export type Post = {
    slug: string
    user: string
    content: string
}
