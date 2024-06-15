import styles from './CountryItem.module.css';

function CountryItem({ data }) {
  return (
    <li className={styles.countryItem}>
      <span>{data.emoji}</span>
      <span>{data.country}</span>
    </li>
  );
}

export default CountryItem;
