import './Tailwind.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTypedDispatch } from './app/hooks';
import { useEffect, useState } from 'react';
import { initialize } from './features/userSlice';
import axios from 'axios';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import LogOut from './pages/logout';
import Signup from './pages/signup';
import Product from './pages/product';
import Cart from './pages/cart';

const Backend = `http://localhost:5000`;

const App = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();
  const [userLogin, setUserLogin] = useState<boolean>(false);

  useEffect(() => {
    const cheakUserLogin = async () => {
      try {
        const response = await axios.get(`${Backend}/api/v1/auth/islogin`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserLogin(response.data.value);
        }
      } catch (e) {
        throw e;
      }
    };
    cheakUserLogin();
  }, []);

  useEffect(() => {
    dispatch(
      initialize({
        userLogin,
      })
    );
  }, [useLocation, dispatch]);

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
              path={`product/:${pathname.split('/')[2]}`}
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
