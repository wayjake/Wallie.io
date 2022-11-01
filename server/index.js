const { gun, namespace } = require('./gun')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const PORT = process.env.PORT || 3000
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')
const htmlData = fs.readFileSync(indexPath, 'utf8')

// static resources should just be served as they are
app.use(
   express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '20m' })
)

const cleanReturnString = (value) => {
   return value.replace(`"`, `'`)
}

app.get('/blog/:id', (req, res) => {
   let numberOfTries = 0
   const chain = gun
      .get(`${namespace}/post`)
      .get(req.params.id)
      .on((post) => {
         numberOfTries++
         if (!post) {
            if (numberOfTries > 1) {
               chain.off()
               return res.sendStatus(404)
            }
            return
         }
         if (res.writableEnded) {
            chain.off()
            return
         }
         const hydratedHtml = htmlData
            .replace('<title>Wallie.io</title>', `<title>${post.title}</title>`)
            .replace('__META_OG_TITLE__', cleanReturnString(post.title))
            .replace(
               '__META_OG_DESCRIPTION__',
               cleanReturnString(post.description)
            )
            .replace(
               '__META_CONTENT__',
               encodeURI(cleanReturnString(post.content))
            )
            .replace('__META_OG_IMAGE__', cleanReturnString(post.image))

         return res.send(hydratedHtml)
      })
   setTimeout(() => {
      chain.off()
      if (res.writableEnded) {
         return
      }
      res.sendStatus(408)
   }, 5000)
})

// here we serve the index.html page
app.get('*', (req, res) => {
   const hydratedHtml = htmlData
      .replace(
         '<title>Wallie.io</title>',
         `<title>Wallie, the new homepage of the internet</title>`
      )
      .replace('__META_OG_TITLE__', `Wallie, the new homepage of the internet`)
      .replace(
         '__META_OG_DESCRIPTION__',
         `Wallie is an open space for sharing our selves on the internet.`
      )
      .replace(
         '__META_DESCRIPTION__',
         `Wallie is an open space for sharing our selves on the internet.`
      )

   return res.send(hydratedHtml)
})

app.listen(PORT, (error) => {
   if (error) {
      return console.log('Error during app startup', error)
   }
   console.log('listening on ' + PORT + '...')
})
