import styles from './AppLayout.module.css';

// Components
import Sidebar from '../../components/sidebar/Sidebar';
import Map from '../../components/map/Map';
import User from '../../components/user/User';
import ProtectedRoute from '../ProtectedRoute';

const AppLayout = () => {
  return (
    <ProtectedRoute>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
