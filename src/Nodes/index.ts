export { default as NewNode } from './NewNode'
export { default as NewSubNode } from './NewSubNode'
export { default as ViewNode } from './ViewNode'
export { default as NodeRow } from './NodeRow'
export { default as DashboardItem } from './DashboardItem'
export { default as NodesLanding } from './NodesLanding'

export type GunId = string
export type Username = string
export type Unixtimestamp = string

export type Directions = {
    GunId: string
}

export type DungeonNode = {
    key: GunId
    id: GunId
    head: GunId
    message: string
    date: Unixtimestamp
    user: GunId | Username
    directions: Directions
    directionText: string
    start: string
    end: string
    upVotes: number
    downVotes: number
}
