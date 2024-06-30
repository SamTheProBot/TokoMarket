import './Tailwind.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Product from './pages/product';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <div className='bg-mid dark:bg-dark'>
        <div className='max-w-[90vw] container'>
          <Routes>
            <Route
              path={'/'}
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route
              path={`/product/${pathname}`}
              element={
                <>
                  <Navbar />
                  <Product />
                </>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
