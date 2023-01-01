import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import numbersToDigitalClock from './time.constant'

const Number = ({
   value,
   setNumberHeight = () => {},
}: {
   value: number | string
   setNumberHeight?: Function
}) => {
   const ref = useRef<any>({})
   const [squareSize, setSquareSize] = useState(20)
   const numberMap = useMemo(() => numbersToDigitalClock[value], [value])

   useEffect(() => {
      if (!ref.current) {
         return
      }
      const squareSize = ref.current.offsetWidth / 6
      setSquareSize(squareSize)
      setNumberHeight(squareSize * 12)
   }, [ref.current.offsetWidth, ref.current.offsetHeight])

   return (
      <div
         ref={ref}
         style={{
            position: 'relative',
            width: '22%',
            margin: '5px',
         }}
      >
         {/* top bar */}
         {!!numberMap.top && (
            <>
               <Square size={squareSize} xOffset={1} />
               <Square size={squareSize} xOffset={2} />
               <Square size={squareSize} xOffset={3} />
               <Square size={squareSize} xOffset={4} />
            </>
         )}

         {/* right-top */}
         {!!numberMap.topRight && (
            <>
               <Square size={squareSize} yOffset={1} xOffset={5} />
               <Square size={squareSize} yOffset={2} xOffset={5} />
               <Square size={squareSize} yOffset={3} xOffset={5} />
               <Square size={squareSize} yOffset={4} xOffset={5} />
            </>
         )}

         {/* right-bottom */}
         {!!numberMap.bottomRight && (
            <>
               <Square size={squareSize} yOffset={6} xOffset={5} />
               <Square size={squareSize} yOffset={7} xOffset={5} />
               <Square size={squareSize} yOffset={8} xOffset={5} />
               <Square size={squareSize} yOffset={9} xOffset={5} />
            </>
         )}

         {/* middle */}
         {!!numberMap.middle && (
            <>
               <Square size={squareSize} yOffset={5} xOffset={1} />
               <Square size={squareSize} yOffset={5} xOffset={2} />
               <Square size={squareSize} yOffset={5} xOffset={3} />
               <Square size={squareSize} yOffset={5} xOffset={4} />
            </>
         )}

         {/* left-top */}
         {!!numberMap.topLeft && (
            <>
               <Square size={squareSize} yOffset={1} />
               <Square size={squareSize} yOffset={2} />
               <Square size={squareSize} yOffset={3} />
               <Square size={squareSize} yOffset={4} />
            </>
         )}

         {/* left-bottom */}
         {!!numberMap.bottomLeft && (
            <>
               <Square size={squareSize} yOffset={6} />
               <Square size={squareSize} yOffset={7} />
               <Square size={squareSize} yOffset={8} />
               <Square size={squareSize} yOffset={9} />
            </>
         )}

         {/* bottom */}
         {!!numberMap.bottom && (
            <>
               <Square size={squareSize} yOffset={10} xOffset={1} />
               <Square size={squareSize} yOffset={10} xOffset={2} />
               <Square size={squareSize} yOffset={10} xOffset={3} />
               <Square size={squareSize} yOffset={10} xOffset={4} />
            </>
         )}
      </div>
   )
}

const Square = ({ xOffset = 0, yOffset = 0, size = 20 }) => {
   const marginSize = 2
   return (
      <div
         style={{
            background: 'black',
            width: size - marginSize,
            height: size - marginSize,
            margin: marginSize,
            position: 'absolute',
            top: yOffset * size,
            left: xOffset * size,
         }}
      ></div>
   )
}

const Colon = ({ date }) => {
   const [show, setShow] = useState(true)

   //duplicate code
   const ref = useRef<any>({})
   const [squareSize, setSquareSize] = useState(20)

   useEffect(() => {
      setShow((show) => !show)
   }, [date])

   //duplicate code
   useEffect(() => {
      if (!ref.current) {
         return
      }
      const squareSize = ref.current.offsetWidth / 3
      setSquareSize(squareSize)
   }, [ref.current.offsetWidth, ref.current.offsetHeight])

   return (
      <div ref={ref} style={{ position: 'relative', width: '12%' }}>
         {show && <Square yOffset={3} xOffset={1.3} size={squareSize} />}
         {show && <Square yOffset={7} xOffset={1.3} size={squareSize} />}
      </div>
   )
}

function getNumbers(date) {
   const hours = padTo2Digits(hours12(date))
   const minutes = padTo2Digits(date.getMinutes())
   return [hours[0], hours[1], minutes[0], minutes[1]]
}

function hours12(date) {
   return (date.getHours() + 24) % 12 || 12
}

function padTo2Digits(num) {
   return String(num).padStart(2, '0')
}

const Time = ({ style }) => {
   const [date, setDate] = useState(new Date())
   const numbers = useMemo(() => getNumbers(date), [date])
   const [numberHeight, setNumberHeight] = useState(100)

   useEffect(() => {
      const interval = setInterval(() => setDate(new Date()), 1000)
      return () => {
         clearInterval(interval)
      }
   }, [])

   return (
      <div
         style={{
            ...style,
            position: 'relative',
            flexGrow: 1,
            display: 'flex',
            height: numberHeight,
         }}
      >
         <Number value={numbers[0]} setNumberHeight={setNumberHeight} />
         <Number value={numbers[1]} />
         <Colon date={date} />
         <Number value={numbers[2]} />
         <Number value={numbers[3]} />
      </div>
   )
}

export default Time
