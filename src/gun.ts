import GUN from 'gun'

const gun = GUN({
    localStorage: true,
    // radisk: false,
    peers: [
        'https://etogun.glitch.me/gun',
        'https://relay.peer.ooo/gun',
        'https://gun-ams1.maddiex.wtf/gun',
        'https://gun-manhattan.herokuapp.com',
    ],
})

export default gun

export const namespace = `wallie2.0`
