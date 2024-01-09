import { useCallback } from 'react'

export const MenuBar = ({ editor }) => {
   const addImage = useCallback(() => {
      //@todo, convert this to a file upload window
      //@todo, is there a way to catch on paste?
      const url = window.prompt('URL')

      if (url) {
         editor.chain().focus().setImage({ src: url }).run()
      }
   }, [editor])

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
         <button onClick={addImage}>add image</button>
      </>
   )
}
