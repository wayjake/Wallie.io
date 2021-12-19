export { default as NewNode } from './NewNode'
export { default as ViewNode } from './ViewNode'
export { default as NodesLanding } from './NodesLanding'

export type GunId = String
export type Username = String

export type DungeonNode = {
    key: GunId
    head: GunId
    message: String
    user: GunId | Username
}
