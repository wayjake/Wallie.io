import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { TipTapStyled } from './TipTap.styled'
import { MenuBar } from './TipTap.MenuBar'

const TipTap = ({
   onChange,
   content,
   placeholder = 'Write something …',
   hideFormatting = false,
}) => {
   const editor = useEditor(
      {
         autofocus: true,
         extensions: [
            Placeholder.configure({
               showOnlyWhenEditable: false,
               placeholder,
            }),
            StarterKit,
            Link.configure({
               openOnClick: false,
            }),
            Image.configure({
               allowBase64: true,
            }),
         ],
         onUpdate({ editor }) {
            onChange(editor.getHTML())
         },
         content,
      },
      [content]
   )
   if (!editor) {
      return null
   }
   return (
      <TipTapStyled>
         {!hideFormatting && <MenuBar editor={editor} />}
         <EditorContent editor={editor} />
      </TipTapStyled>
   )
}
export default TipTap
