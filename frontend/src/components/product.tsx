import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FRAMER_PRODUCT_FADE } from '../util/animation/page';
import { useTypedDispatch } from '../app/hooks';
import { fetchUserCart } from '../features/cartSlice';
import { closePanal, openPanal } from '../features/extraSlice';
import axios from 'axios';

const Backend = `http://localhost:5000`;

const Product = ({ image, name, price, _id }: any) => {
  const dispatch = useTypedDispatch();
  const [isHover, setIsHover] = useState<any>(false);

  const handelAdditem = async () => {
    try {
      const response = await axios.post(
        // `${window.location.origin}/api/v1/cart/additem`,
        `${Backend}/api/v1/cart/additem`,
        {
          productId: _id,
          count: 1,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(fetchUserCart());
        dispatch(openPanal());
        const time = setTimeout(() => {
          return dispatch(closePanal());
        }, 5000);
        return () => clearTimeout(time);
      }
    } catch (e) {
      throw e;
    }
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
            onClick={handelAdditem}
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
