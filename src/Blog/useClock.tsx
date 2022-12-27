import useListen from 'GunApi/useListen'
import { DungeonNode } from 'Nodes'

export const useClock = (): DungeonNode => {
   const clock = useListen('clock', 'node', true) as DungeonNode
   return clock
}
