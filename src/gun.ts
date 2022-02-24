import GUN from 'gun/gun'

const gun = GUN(['https://gun.4d2.io/gun', 'https://relay.peer.ooo/gun'])

export default gun

export const namespace = `wallie`
