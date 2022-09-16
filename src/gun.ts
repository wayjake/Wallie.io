import GUN from 'gun'

const gun = GUN({
    localStorage: false,
    // radisk: false,
    peers: ['https://relay.peer.ooo/gun', 'http://192.155.85.68:8765/gun'],
})

export default gun

export const namespace = `wallie2.0`
