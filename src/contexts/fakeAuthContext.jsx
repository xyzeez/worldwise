import { createContext, useContext, useReducer } from 'react';

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const fakeAuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'logout':
      return { ...state, ...initialState };
    default:
      throw new Error('Unknown reducer action type');
  }
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };

  return (
    <fakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </fakeAuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(fakeAuthContext);
  if (!context) throw new Error('Auth context used outside of provider');
  return context;
};

export { AuthProvider, useAuth };
