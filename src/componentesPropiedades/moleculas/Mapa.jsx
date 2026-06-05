import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Recenter({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords?.lat && coords?.lng) {
            map.setView([coords.lat, coords.lng], 15);
        }
    }, [coords, map]);
    return null;
}

const ClickHandler = ({ setPosition, handleLocationChange }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            if (handleLocationChange) handleLocationChange(e);
        }
    });
    return null;
};

const Mapa = ({ handleLocationChange, coordenadas, interactive = true }) => {
    const defaultPos = [-33.666667, -65.466667];
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (coordenadas?.lat && coordenadas?.lng) {
            setPosition([coordenadas.lat, coordenadas.lng]);
        }
    }, [coordenadas]);

    return (
        <div className="w-full">
            <div className="rounded-[2rem] overflow-hidden border border-gray-100 shadow-inner">
                <MapContainer 
                    className="h-80 w-full z-10" 
                    center={coordenadas?.lat ? [coordenadas.lat, coordenadas.lng] : defaultPos} 
                    zoom={15}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Recenter coords={coordenadas} />
                    {interactive && <ClickHandler setPosition={setPosition} handleLocationChange={handleLocationChange} />}
                    {position && position[0] !== 0 && <Marker position={position} />}
                </MapContainer>
            </div>
        </div>
    );
};

export default Mapa;
