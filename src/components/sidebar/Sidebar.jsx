import styles from './Sidebar.module.css';

// Components
import Logo from '../logo/Logo';
import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
    </div>
  );
};
export default Sidebar;
