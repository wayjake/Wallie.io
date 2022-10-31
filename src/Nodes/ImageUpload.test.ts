import GUN from 'gun'

const gun = GUN({ rad: false })

test('adding one gets you a one', (next) => {
   gun.get('one').put(1)

   gun.get('one').on((item) => {
      expect(item).toEqual(2)
      next()
   })
})
