import GUN from 'gun'

const gun = GUN({
    localStorage: false,
    // radisk: false,
    peers: [
        // 'https://relay.peer.ooo/gun',
        'http://localhost:8765/gun',
        // 'https://gun.4d2.io/gun',
    ],
})

declare global {
    interface Window {
        gun: any
        namespace: string
    }
}
window.gun = gun

export default gun

export const namespace = `wallie2.0`
window.namespace = namespace

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
