import { useEffect, useMemo, useRef, useState } from 'react'
import moment, { Moment } from 'moment'

/***
 *  copied from the king
 *  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
function useInterval(callback) {
    const savedCallback = useRef(() => {})

    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }

        let id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])
}

/***
 *
 *   NO REF AND APPEARS TO OPERATE THE SAME
 */
function useIntervalWithNoRef(callback: () => void, delay) {
    useEffect(() => {
        let id = setInterval(callback, delay)
        return () => clearInterval(id)
    }, [delay])
}

/***
 *
 *  NICK'S SANDBOX
 *
 */
function useJBInterval(callback: () => void, delay) {
    const savedCallback = useRef(() => {})

    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }

        let id = setInterval(tick, delay)
        return () => clearInterval(id)
    }, [delay])
}

const ACCESS_DEEP_STATE = true

const NoRefInterval = () => {
    const [state, setState] = useState<number>(0)

    useIntervalWithNoRef(() => setState((prev) => prev + 1), 3000)

    return <></>
}

const DaysUntil = ({ eventDate }: { eventDate: Moment }) => {
    var compareDate = moment()
    return (
        <>
            event date: {eventDate.format()} <br />
            compare date: {compareDate.format()} <br />
            diff:{eventDate.diff(compareDate, 'seconds')}
        </>
    )
}

const Intervals = () => {
    const [state, setState] = useState({
        numberRuns: 0,
    })
    const [numberRuns, setNumberRuns] = useState(0)
    const [nonRefState, setNonRefState] = useState(0)

    var eventDate = useMemo(() => moment().add(10, 'seconds'), [])

    useIntervalWithNoRef(() => {
        console.log(state.numberRuns)

        //checking and setting primitive state
        console.log(`number of runs primitive ${numberRuns}`)
        //setting primitive state with callback
        if (ACCESS_DEEP_STATE) {
            setNumberRuns((numberRuns) => numberRuns + 1)
        } else {
            setNumberRuns(numberRuns + 1)
        }

        if (ACCESS_DEEP_STATE) {
            /**
             *
             *    we can simply grab the state by utilizing the
             *    useState callback to get the freshest of fresh state
             *
             */
            setState((state) => {
                return { ...state, numberRuns: state.numberRuns + 1 }
            })
        } else {
            /***
             *     this SHOULD work with the referenced function
             *     but i do not think it does.
             */
            setState({ ...state, numberRuns: state.numberRuns + 1 })
        }
    }, 500)

    return (
        <>
            <h2>Ref state: {state.numberRuns}</h2>
            <h2>Primitive state: {numberRuns}</h2>
            <h2>Non Ref State: {}</h2>
            <DaysUntil eventDate={eventDate} />
        </>
    )
}

export default Intervals
