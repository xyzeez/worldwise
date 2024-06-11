import styles from './AppLayout.module.css';

// Components
import AppNav from '../../components/AppNav/AppNav';
import Sidebar from '../../components/sidebar/Sidebar';
import Map from '../../components/map/Map';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
