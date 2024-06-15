import styles from './CityList.module.css';

// Components
import Spinner from '../spinner/Spinner';
import CityItem from './CityItem';
import Message from '../message/Message';

const CityList = ({ data, loading }) => {
  if (loading) return <Spinner />;

  if (!data.length)
    return (
      <Message message="Add your first city by clicking on a city on the map!" />
    );
  return (
    <ul className={styles.cityList}>
      {data.map((item) => (
        <CityItem data={item} key={item.id} />
      ))}
    </ul>
  );
};
export default CityList;
