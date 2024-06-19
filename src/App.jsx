import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Contexts
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/fakeAuthContext';

// Pages
const Home = lazy(() => import('./pages/home/Home'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/login/Login'));
const AppLayout = lazy(() => import('./pages/app/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Components
import CityList from './components/city/CityList';
import CountryList from './components/country/CountryList';
import City from './components/city/City';
import Form from './components/form/Form';
import SpinnerFullPage from './components/spinner/SpinnerFullPage';

const App = () => {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
};

export default App;
