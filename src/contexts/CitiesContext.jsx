import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

// Variables
const url = 'http://localhost:8000/cities';

const CitiesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'currCity/loaded':
      return { ...state, isLoading: false, currCity: action.payload };
    case 'rejected':
      return { ...state, isLoading: false };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        currCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error('Unknown reducer action type');
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, currCity, isLoading }, dispatch] = useReducer(reducer, {
    cities: [],
    currCity: [],
    isLoading: false,
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: 'loading' });

        const res = await fetch(url);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'rejected' });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currCity.id) return;

      try {
        dispatch({ type: 'loading' });

        const res = await fetch(`${url}/${id}`);
        const data = await res.json();

        dispatch({ type: 'currCity/loaded', payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: 'rejected' });
      }
    },
    [currCity.id]
  );

  const createCity = async (newCity) => {
    try {
      dispatch({ type: 'loading' });

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'rejected' });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: 'loading' });

      const res = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'rejected' });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) throw new Error('Cities context was used outside provider');
  return context;
};

export { CitiesProvider, useCities };
