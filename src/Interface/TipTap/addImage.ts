import { Editor } from '@tiptap/react'
import { useCallback } from 'react'
import {
   initializeImageMagick,
   ImageMagick,
   MagickFormat,
   ByteArray,
} from '@imagemagick/magick-wasm'

const wasmLocation = new URL(
   '@imagemagick/magick-wasm/magick.wasm',
   import.meta.url
)
initializeImageMagick(wasmLocation).then((res) => {
   console.log('ImageMagick is ready!')
})

export const useAddImage = (editor: Editor) => {
   const addImage = useCallback(() => {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = (_) => {
         const files = input.files ? Array.from(input.files) : []
         if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
               const arrayBuffer = e.target?.result as ArrayBuffer
               const array = new Uint8Array(arrayBuffer)
               ImageMagick.read(array, (image) => {
                  console.log(image)
                  image.resize(800, 640)
                  image.write(MagickFormat.Jpg, (outputBuffer) => {
                     const blob = new Blob([outputBuffer], {
                        type: 'image/jpeg',
                     })

                     // Convert blob to Base64 for the editor
                     const readerForEditor = new FileReader()
                     readerForEditor.onloadend = function () {
                        const base64data = readerForEditor.result
                        editor
                           .chain()
                           .focus()
                           .setImage({ src: base64data as unknown as string })
                           .run()
                     }
                     readerForEditor.readAsDataURL(blob)

                     // Trigger download
                     const downloadLink = document.createElement('a')
                     downloadLink.href = URL.createObjectURL(blob)
                     downloadLink.download = 'converted-image.jpg'
                     document.body.appendChild(downloadLink)
                     downloadLink.click()
                     document.body.removeChild(downloadLink)
                     URL.revokeObjectURL(downloadLink.href)

                     image.dispose()
                  })
               })
            }
            reader.onerror = (error) => {
               console.error('Error reading file:', error)
            }
            reader.readAsArrayBuffer(file)
         }
      }
      input.click()
   }, [editor])

   return { addImage }
}
