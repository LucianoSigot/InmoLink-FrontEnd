import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import SectionTitle from '../atomos/SectionTitle'

const ClickHandler = ({ position, setPosition, handleLocationChange }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng)
            handleLocationChange(e)
        }
    })
    return position ? <Marker position={position} /> : null
}

const Mapa = ({ handleLocationChange, coordenadas }) => {
    const defaultPosition = [-33.666667, -65.466667];
    const initialPosition = coordenadas && coordenadas.lat && coordenadas.lng
        ? [coordenadas.lat, coordenadas.lng]
        : defaultPosition;

    const [position, setPosition] = useState(initialPosition)
    return (
        <div>
            <SectionTitle>Ubicación</SectionTitle>
            <MapContainer className="h-64 w-full" center={initialPosition} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ClickHandler position={position} setPosition={setPosition} handleLocationChange={handleLocationChange} />
            </MapContainer>
        </div>
    )
}

export default Mapa