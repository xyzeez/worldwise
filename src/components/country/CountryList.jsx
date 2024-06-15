import styles from './CountryList.module.css';

// Components
import Spinner from '../spinner/Spinner';
import CountryItem from './CountryItem';
import Message from '../message/Message';

const CountryList = ({ data, loading }) => {
  if (loading) return <Spinner />;

  if (!data.length)
    return (
      <Message message="Add your first city by clicking on a city on the map!" />
    );

  const countries = data.reduce((arr, city) => {
    if (!arr.map((item) => item.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((item) => (
        <CountryItem data={item} key={item.id} />
      ))}
    </ul>
  );
};
export default CountryList;
