import { Link } from 'react-router-dom';
import { isLoggedIn } from '../features/userSlice';
import { shopOffset } from '../features/extraSlice';
import { useTypedSelector } from '../app/hooks';

const Navbar = () => {
  const offsetTop = useTypedSelector(shopOffset);
  const isLogged = useTypedSelector(isLoggedIn);

  const handleShop = () => {
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  };

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className='fixed top-0 h-[4.5rem] w-[92%] z-10 bg-mid dark:bg-dark'>
        <div className='h-full w-full text-2xl text-dark dark:text-light bg-mid dark:bg-dark font-heading flex justify-between items-center px-12'>
          <div className=' tracking-wider'>VERDANT MARKET</div>
          <div className='w-[55%] h-full flex justify-end'>
            <ul className='w-[60%] h-full flex justify-evenly items-center text-xl'>
              <li onClick={handleHome}>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <button onClick={handleShop}>Shop</button>
              </li>
              {isLogged ? (
                <>
                  <li>
                    <Link to={`/logout`}>Log Out</Link>
                  </li>
                  <li className='rounded-full h-8 w-8'>
                    <img src='shoppingcart.svg' />
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
