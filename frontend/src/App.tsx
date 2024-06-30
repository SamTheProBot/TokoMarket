import './Tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
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
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
