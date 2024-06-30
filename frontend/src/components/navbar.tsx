import { Link } from 'react-router-dom';

const Navbar = () => {
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
                <Link to={'/'}>Shop</Link>
              </li>
              <li>
                <Link to={`/login`}>Log In</Link>
              </li>
              <li className='rounded-full bg-dark text-light dark:bg-light dark:text-dark px-6 py-2'>
                <Link to={`/signup`}>Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
