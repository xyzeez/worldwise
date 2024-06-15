import styles from './CountryItem.module.css';

function CountryItem({ cities }) {
  return (
    <li className={styles.countryItem}>
      <span>{cities.emoji}</span>
      <span>{cities.country}</span>
    </li>
  );
}

export default CountryItem;
