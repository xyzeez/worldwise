import styles from './CityList.module.css';

// Contexts
import { useCities } from '../../contexts/CitiesContext';

// Components
import Spinner from '../spinner/Spinner';
import CityItem from './CityItem';
import Message from '../message/Message';

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map!" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((item) => (
        <CityItem cities={item} key={item.id} />
      ))}
    </ul>
  );
};
export default CityList;
