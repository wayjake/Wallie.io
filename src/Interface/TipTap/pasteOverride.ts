import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

function handlePaste(editor, view, event, slice) {
   if (!event.clipboardData) {
      return false
   }
   const items = event.clipboardData.items
   for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === 0) {
         const file = items[i].getAsFile()
         console.log('Pasted image:', file)
         // Perform your custom image handling here

         // Convert file to base64 or your preferred format
         const reader = new FileReader()
         reader.onload = (readerEvent) => {
            const base64data = readerEvent?.target?.result
            editor
               .chain()
               .focus()
               .setImage({ src: base64data as unknown as string })
               .run()
         }
         reader.readAsDataURL(file)

         event.preventDefault()
         return true
      }
   }
   // If no image, handle text paste as usual
   const text = event.clipboardData.getData('text/plain')
   if (!text) {
      event.preventDefault()
      return true
   }
   console.log('Pasted text:', text)
}

export const CustomPasteHandler = (editor) =>
   Extension.create({
      name: 'customPasteHandler',
      addProseMirrorPlugins() {
         return [
            new Plugin({
               key: new PluginKey('eventHandler'),
               props: {
                  handlePaste: (view, event, slice) =>
                     handlePaste(editor, view, event, slice),
               },
            }),
         ]
      },
   })
