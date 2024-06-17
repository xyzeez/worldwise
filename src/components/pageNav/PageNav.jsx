import { NavLink, useNavigate } from 'react-router-dom';
import styles from './PageNav.module.css';

// Contexts
import { useAuth } from '../../contexts/fakeAuthContext';

// Components
import Logo from '../logo/Logo';
import Button from '../button/Button';

const PageNav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handlerUserAuth = () => {
    if (isAuthenticated) logout();
    else navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <Button type="primary" clickHandler={handlerUserAuth}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
