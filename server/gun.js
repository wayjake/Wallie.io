const GUN = require('gun')

const gun = GUN(['https://gun.4d2.io/gun', 'https://relay.peer.ooo/gun'])

module.exports = {
    gun,
    namespace: `wallie`,
}
