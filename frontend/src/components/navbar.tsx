import { Link } from 'react-router-dom';
import { isLoggedIn } from '../features/userSlice';
import { useTypedSelector } from '../app/hooks';

const Navbar = () => {
  const isLogged = useTypedSelector(isLoggedIn);
  return (
    <>
      <nav className='fixed top-0 h-[4.5rem] w-[90%] z-10 bg-mid dark:bg-dark'>
        <div className='h-full w-full text-2xl text-dark dark:text-light bg-mid dark:bg-dark font-heading flex justify-between items-center px-12'>
          <div className=' tracking-wider'>VERDANT MARKET</div>
          <div className='w-[50%] h-full flex justify-end'>
            <ul className='w-[60%] h-full flex justify-evenly items-center text-xl'>
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <button>Shop</button>
              </li>
              {isLogged ? (
                <>
                  <li>
                    <Link to={`/logout`}>Log Out</Link>
                  </li>
                  <li className='rounded-full bg-dark text-light dark:bg-light dark:text-dark px-6 py-2'>
                    <Link to={`/cart`}>Cart</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={`/login`}>Log In</Link>
                  </li>
                  <li className='rounded-full bg-dark text-light dark:bg-light dark:text-dark px-6 py-2'>
                    <Link to={`/signup`}>Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
