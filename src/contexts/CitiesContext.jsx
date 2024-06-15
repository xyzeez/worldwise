import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext(null);

const CitiesProvider = ({ children }) => {
  const url = 'http://localhost:8000/cities';
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(url);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
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
