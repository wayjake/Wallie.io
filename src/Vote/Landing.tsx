import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import gun from '../gun'
import { Helmet } from 'react-helmet'

const redName = '#696969'
const blueName = '#808080'

//@todo pass the color in as props for the buttons
const Button = styled.div`
    padding: 0.5rem 0;
    padding-top: 5rem;
    margin: 0.5rem 1rem;
    width: 11rem;
    border-radius: 10px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    text-align: center;
    vertical-align: middle;
    border: #777 solid 2px;
    height: 6rem;
    font-weight: 800;
    cursor: pointer;
    user-select: none;
    font-size: 20px;

    &:hover {
        animation: createBox 0.25s;
    }

    @keyframes createBox {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.01);
        }
    }
`

const TopBar = styled.div`
    width: 100%;
    height: 30px;
    position: fixed;
    display: flex;
    flex: 0 0 100%; /* flex-grow, flex-shrink, flex-basis */
    padding-top: 9px;
    padding-left: 7px;
    padding-bottom: 0px;
    border-bottom: solid thin #777;
`

const Item = styled.div`
    margin-left: 10px;
`

const VoteWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const AppWrapper = styled.div`
    height: 100%;
`

function App() {
    const [blueVotes, setBlueVotes] = useState(0)
    const [redVotes, setRedVotes] = useState(0)
    const loaded = useRef({ red: false, blue: true })

    const redVotesRef = gun.get('redVotes').get('number')
    const blueVotesRef = gun.get('blueVotes').get('number')

    useEffect(() => {
        redVotesRef.on((data) => {
            loaded.current.red = true
            setRedVotes(data)
        })
    }, [])

    useEffect(() => {
        blueVotesRef.on((data) => {
            loaded.current.blue = true
            setBlueVotes(data)
        })
    }, [])

    const voteRed = () => {
        if (!loaded.current.red) return
        return redVotesRef.once((data: any) => {
            redVotesRef.put(1 + data)
        })
    }

    const voteBlue = () => {
        if (!loaded.current.blue) return
        return blueVotesRef.once((data: any) => {
            blueVotesRef.put(data + 1)
        })
    }

    return (
        <AppWrapper>
            <Helmet>
                <title>Gun Voting</title>
            </Helmet>
            <TopBar>
                <Item>
                    {redName}-Votes: {redVotes || 'NA'}
                </Item>
                <Item>
                    {blueName}-Votes: {blueVotes || 'NA'}
                </Item>
                <Item>
                    <a
                        href="https://github.com/wayjake/gunVote"
                        target="_blank"
                    >
                        Contribute
                    </a>
                </Item>
            </TopBar>

            <VoteWrapper>
                <Button onClick={voteRed}>{redName} </Button>
                <Button onClick={voteBlue}>{blueName} </Button>
            </VoteWrapper>
        </AppWrapper>
    )
}

export default App
