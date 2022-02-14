export { default as ViewMap } from './ViewMap'

type NodeRef = String

//key is `${x}+${y}` where it's pair is a reference to a node
export type GridNode = {
    key: NodeRef
}
