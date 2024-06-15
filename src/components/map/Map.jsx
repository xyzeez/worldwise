import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import styles from './Map.module.css';

// Contexts
import { useCities } from '../../contexts/CitiesContext';

// Hooks
import useGeolocation from '../../hooks/useGeolocation';
import useUrlPosition from '../../hooks/useUrlPosition';

// Components
import Button from '../button/Button';

const SetMapCenter = ({ position }) => {
  const map = useMap();
  map.flyTo(position, 13, { animate: true, duration: 5 });
  return null;
};

const GetClickCoords = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
};

const Map = () => {
  const [mapLat, mapLng] = useUrlPosition();
  const { isLoading, position, getPosition } = useGeolocation();
  const { cities } = useCities();
  const [mapCoords, setMapCoords] = useState([0, 0]);

  useEffect(() => {
    if (mapLat && mapLng) setMapCoords([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (position) setMapCoords([position.lat, position.lng]);
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" clickHandler={getPosition}>
          {isLoading ? 'Getting position...' : 'Use your location'}
        </Button>
      )}

      <MapContainer
        className={styles.mapContainer}
        zoom={13}
        center={mapCoords}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <SetMapCenter position={mapCoords} />
        <GetClickCoords />
      </MapContainer>
    </div>
  );
};

export default Map;
