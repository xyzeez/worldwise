import { createContext, useContext, useEffect, useState } from 'react';

// Variables
const url = 'http://localhost:8000/cities';

const CitiesContext = createContext(null);

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [currCity, setCurrCity] = useState([]);
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

  const getCity = async (id) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${url}/${id}`);
      const data = await res.json();

      setCurrCity(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async (newCity) => {
    try {
      setIsLoading(true);

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      setCurrCity(data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setIsLoading(true);

      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getCity, currCity, createCity, deleteCity }}>
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
