import './Tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Product from './pages/product';
import Cheakout from './pages/cheakout';
import NotFound from './pages/notfound';
import Footer from './components/footer';
import Navbar from './components/navbar';

function Nav() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/product:id'} element={<Product />} />
        <Route path={'/cheakout'} element={<Cheakout />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Nav />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
