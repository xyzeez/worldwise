import { Link } from 'react-router-dom';

import styles from './Cityitem.module.css';

// Contexts
import { useCities } from '../../contexts/CitiesContext';

// Components
// import ButtonBack from '../';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

const CityItem = ({ cities }) => {
  const { cityName, emoji, date, id, position } = cities;
  const { currCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};
export default CityItem;
