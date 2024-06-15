import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Contexts
import { CitiesProvider } from './contexts/CitiesContext';

// Pages
import Home from './pages/home/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/login/Login';
import AppLayout from './pages/app/AppLayout';
import PageNotFound from './pages/PageNotFound';

// Components
import CityList from './components/city/CityList';
import CountryList from './components/country/CountryList';
import City from './components/city/City';
import Form from './components/form/Form';

const App = () => {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
};

export default App;
