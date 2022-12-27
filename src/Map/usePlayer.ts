import { DungeonNode } from 'Nodes'
import { useEffect, useState } from 'react'
import useListen from '../GunApi/useListen'
import useUpdate from '../GunApi/useUpdate'
import { Player } from './Player'

export const usePlayer = (username) => {
   const gunPlayer = useListen(username, 'players', true) as DungeonNode
   const [setGunPlayer] = useUpdate('players')
   const [player, setPlayerState] = useState<Player>()

   useEffect(() => {
      console.log(`setting from usePlayer watcher on gunPlayer`)
      console.log(gunPlayer)
      setPlayerState({ ...gunPlayer[0] }) //i probably just broke this
   }, [gunPlayer])

   const setPlayer = (callback) => {
      setPlayerState((player) => {
         const newState: Player = callback(player)
         console.log(newState)
         setGunPlayer(newState)
         return newState
      })
   }

   return { player, setPlayer }
}
