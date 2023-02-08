import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import styled from 'styled-components'

const TipTapStyled = styled.div`
   .ProseMirror {
      background: white;
      margin-top: 10px;
      > * + * {
         margin-top: 0.75em;
      }
      border: black thin solid;
      padding: 10px 20px 20px 20px;
      ul,
      ol {
         padding: 0 1rem;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
         line-height: 1.1;
      }

      code {
         background-color: rgba(#616161, 0.1);
         color: #616161;
      }

      pre {
         background: #0d0d0d;
         color: #fff;
         font-family: 'JetBrainsMono', monospace;
         padding: 0.75rem 1rem;
         border-radius: 0.5rem;

         code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
         }
      }

      img {
         max-width: 100%;
         height: auto;
      }

      blockquote {
         padding-left: 1rem;
         border-left: 2px solid rgba(#0d0d0d, 0.1);
      }

      hr {
         border: none;
         border-top: 2px solid rgba(#0d0d0d, 0.1);
         margin: 2rem 0;
      }
   }
`

const MenuBar = ({ editor }) => {
   if (!editor) {
      return null
   }

   return (
      <>
         <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
         >
            italic
         </button>
         <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
         >
            bold
         </button>
         <button
            onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
            className={editor.isActive('font') ? 'is-active' : ''}
         >
            font
         </button>
         <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
         >
            strike
         </button>
         <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
         >
            code
         </button>
         <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            clear marks
         </button>
         <button onClick={() => editor.chain().focus().clearNodes().run()}>
            clear nodes
         </button>
         <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
         >
            paragraph
         </button>
         <br />
         <button
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
               editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
         >
            h1
         </button>
         <button
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
               editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
         >
            h2
         </button>
         <button
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
               editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
         >
            h3
         </button>
         <button
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
               editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
            }
         >
            h4
         </button>
         <button
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
               editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
            }
         >
            h5
         </button>
         <button
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
               editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
            }
         >
            h6
         </button>
         <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
         >
            bullet list
         </button>
         <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
         >
            ordered list
         </button>
         <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
         >
            horizontal rule
         </button>
      </>
   )
}

const TipTap = ({
   onChange,
   content,
   placeholder = 'Write something …',
   hideFormatting = false,
}) => {
   const editor = useEditor(
      {
         extensions: [
            Placeholder.configure({
               showOnlyWhenEditable: false,
               placeholder,
            }),
            StarterKit,
            Link.configure({
               openOnClick: false,
            }),
         ],
         onUpdate({ editor }) {
            onChange(editor.getHTML())
         },
         content,
      },
      [content]
   )

   return (
      <TipTapStyled>
         {!hideFormatting && <MenuBar editor={editor} />}
         <EditorContent editor={editor} />
      </TipTapStyled>
   )
}
export default TipTap
