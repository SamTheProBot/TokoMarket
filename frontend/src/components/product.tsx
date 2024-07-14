import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FRAMER_PRODUCT_FADE } from '../util/animation/page';
import { isLoggedIn } from '../features/userSlice';
import { useTypedSelector } from '../app/hooks';

const Product = ({ image, name, price, _id }: any) => {
  const navigate = useNavigate();
  const isLogged = useTypedSelector(isLoggedIn);
  const [isHover, setIsHover] = useState<any>(false);

  const handleClick: any = () => {
    isLogged ? navigate(`/product/${_id}`) : navigate(`/login`);
  };

  return (
    <>
      <motion.article
        {...FRAMER_PRODUCT_FADE}
        className='bg-mid font-context duration-500'
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}>
        <div className='relative overflow-hidden h-80 bg-slate-400'>
          <Link to={`/product/${_id}`}>
            <img
              className='object-center object-contain h-fit'
              src={image}
              alt={name}
            />
          </Link>
        </div>
        <div className='h-32 flex flex-col justify-around items-center pt-3'>
          <div className='font-normal'>{name}</div>
          <div className='font-light text-dark/70'>${price}</div>
          <button
            onClick={handleClick}
            className={`${
              isHover ? `bg-dark` : `bg-base`
            } w-full text-mid h-10 rounded-sm`}>
            Add to Cart
          </button>
        </div>
      </motion.article>
    </>
  );
};

export default Product;
