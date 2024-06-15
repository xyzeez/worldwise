import styles from './CountryList.module.css';

// Contexts
import { useCities } from '../../contexts/CitiesContext';

// Components
import Spinner from '../spinner/Spinner';
import CountryItem from './CountryItem';
import Message from '../message/Message';

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map!" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((item) => item.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((item) => (
        <CountryItem cities={item} key={item.id} />
      ))}
    </ul>
  );
};
export default CountryList;
