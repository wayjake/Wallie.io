const GUN = require('gun')

const gun = GUN([
    'https://etogun.glitch.me/gun',
    'https://relay.peer.ooo/gun',
    'https://gun-ams1.maddiex.wtf/gun',
    'https://gun-manhattan.herokuapp.com',
])

module.exports = {
    gun,
    namespace: `wallie`,
}
