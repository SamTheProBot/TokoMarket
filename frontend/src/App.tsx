import './Tailwind.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTypedDispatch } from './app/hooks';
import { useCookie } from './hooks/usecookie';
import { useEffect } from 'react';
import { initialize } from './features/userSlice';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import LogOut from './pages/logout';
import Signup from './pages/signup';
import Product from './pages/product';
import Cart from './pages/cart';

const App = () => {
  const cookie = useCookie(`access_token`);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(initialize({ value: cookie !== null, access_token: cookie }));
  }, [cookie, dispatch]);

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
            <Route path={'/logout'} element={<LogOut />} />
            <Route
              path={`product/${pathname.split('/')[2]}`}
              element={
                <>
                  <Navbar />
                  <Product />
                </>
              }
            />
            <Route
              path={'/cart'}
              element={
                <>
                  <Navbar />
                  <Cart />
                </>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
