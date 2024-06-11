import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/login/Login';
import AppLayout from './pages/app/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/city/CityList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route path="cities" element={<p>Testing1</p>} />
          <Route path="countries" element={<p>Testing2</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
