import styles from './Button.module.css';

const Button = ({ type, clickHandler, children }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={clickHandler}>
      {children}
    </button>
  );
};
export default Button;
