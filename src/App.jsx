import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/login/Login';
import AppLayout from './pages/app/AppLayout';
import PageNotFound from './pages/PageNotFound';

// Components
import CityList from './components/city/CityList';

// Variables
const url = 'http://localhost:8000/cities';

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList data={cities} loading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList data={cities} loading={isLoading} />}
          />
          <Route path="countries" element={<p>Testing2</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
