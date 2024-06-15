import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

const Map = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useSearchParams();

  const lat = searchQuery.get('lat');
  const lng = searchQuery.get('lng');

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      Map
    </div>
  );
};
export default Map;
