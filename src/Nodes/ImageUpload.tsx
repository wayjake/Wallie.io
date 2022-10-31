import { type FC, useRef, useEffect } from 'react'

type OnImageAdded = (a: string) => void

export const ImageUpload: FC = () => {
   const canvas = useRef(null!)

   const draw = (ctx) => {
      console.log(`draw called`)
      ctx.font = '48px serif'
      ctx.fillText('Hello world', 10, 50)
   }
   useEffect(() => {
      //@ts-ignore
      const context = canvas.current.getContext('2d')
      draw(context)
   }, [])
   return (
      <>
         <canvas ref={canvas} style={{ width: '100%', height: 'auto' }} />
      </>
   )
}
