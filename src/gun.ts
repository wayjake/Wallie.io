import GUN from 'gun'

const gun = GUN({
   localStorage: false,
   // radisk: false,
   peers: ['https://peer.wallie.io/gun'],
})

export default gun

export const namespace = `wallie2.0`

// every 15 minutes send an update to make sure we're still connected
setInterval(() => {
   gun.get(`${namespace}/heartbeat`).put(
      { time: new Date().getTime() },
      (awk) => {
         console.log(awk)
         console.log(`heartbeat performed`)
      }
   )
}, 10 * 60 * 1000)
