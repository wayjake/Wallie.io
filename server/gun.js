const GUN = require('gun')

const gun = GUN({
    radisk: false,
    peers: ['https://relay.peer.ooo/gun', 'https://gun.4d2.io/gun'],
})

module.exports = {
    gun,
    namespace: `wallie2.0`,
}
