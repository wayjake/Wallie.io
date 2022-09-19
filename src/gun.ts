import GUN from 'gun'

const gun = GUN({
    localStorage: false,
    // radisk: false,
    peers: [
        'https://relay.peer.ooo/gun',
        // 'https://gun.4d2.io/gun'
    ],
})

export default gun

export const namespace = `wallie2.0`
