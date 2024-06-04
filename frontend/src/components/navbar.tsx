import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className='h-[10vh] w-full text-3xl font-semibold bg-dark text-back flex justify-between items-center px-12'>
        <div>TokoMarket</div>
        <div>
          <Link
            to={'/cheakout'}
            className='py-4 px-5 rounded-lg font-normal text-xl'>
            cheakout
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
