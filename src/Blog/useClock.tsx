import useListen from 'api/useListen'
import { DungeonNode } from 'Nodes'

export const useClock = (): DungeonNode => {
   const clock = useListen('clock', 'node', true) as DungeonNode
   return clock
}
