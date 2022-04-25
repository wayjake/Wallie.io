import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledGeoLocation = styled.div`
    padding-top: 5rem;
    text-align: center;
`

export default () => {
    const [lat, setLat] = useState<number | null>(null)
    const [lng, setLng] = useState<number | null>(null)

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
            },
            () => {
                console.error('Unable to retrieve your location')
            }
        )
        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    return (
        <StyledGeoLocation>
            <h1>Your Location</h1>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
        </StyledGeoLocation>
    )
}
