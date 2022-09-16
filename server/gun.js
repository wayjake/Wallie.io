const GUN = require('gun')

const gun = GUN({
    radisk: false,
    peers: ['https://relay.peer.ooo/gun', 'http://192.155.85.68:8765/gun'],
})

module.exports = {
    gun,
    namespace: `wallie2.0`,
}
