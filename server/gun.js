const GUN = require('gun')

const gun = GUN({
   radisk: false,
   peers: ['https://peer.wallie.io/gun'],
})

module.exports = {
   gun,
   namespace: `wallie2.0`,
}
