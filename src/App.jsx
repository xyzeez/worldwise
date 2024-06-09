import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/login/Login';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
