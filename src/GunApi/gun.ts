import GUN from 'gun'

const peers = ['https://peer.wallie.io/gun']

if (window.location.hostname === 'localhost') {
   // peers.push('http://192.168.1.7:8765/gun')
   peers.push('http://192.168.1.94:8765/gun')
}

const gun = GUN({
   localStorage: true,
   peers,
})

export default gun

const queryString = window.location.search

const urlParams = new URLSearchParams(queryString)
const subDomain = window.location.host.split('.')[0]
console.log(subDomain)
export const defaultNamespace =
   urlParams.get('namespace') || subDomain || `wallie2.0`
export let namespace: string = defaultNamespace

export const setNamespace = (newValue: string | undefined): void => {
   if (!newValue) {
      namespace = defaultNamespace
      return
   }
   namespace = newValue as string
}

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
