import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTypedSelector, useTypedDispatch } from '../app/hooks';
import { totalAmount, clearCart, addToCart } from '../features/cartSlice';

const BACKEND_URL = 'http://localhost:5000/api/v1';

const Cart = () => {
  const amount = useTypedSelector(totalAmount);
  const dispatch = useTypedDispatch();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/cart/getitem`, {
          withCredentials: true,
        });
        dispatch(clearCart());
        setData(response.data);
        let total = 0;
        response.data.map(
          (product: any) => (total += product.data.price * product.count)
        );
        dispatch(addToCart(total));
      } catch (e) {
        throw e;
      }
    };
    getCartItem();
  }, []);

  const handleClick = () => {};

  return (
    <>
      <motion.section className='h-[93vh] w-full flex justify-center items-center font-context text-dark pt-16'>
        <div className='h-full w-[50%] flex flex-row justify-evenly'>
          <div className='h-full w-[67%]'>
            <div className='h-[10%] w-full font-heading p-3 text-4xl'>
              My cart
            </div>
            <p className='w-[40%] h-[1px] bg-dark'></p>

            <div className='h-[90%] overflow-y-scroll scrollbar-hide'>
              {data?.map((product: any) => {
                return (
                  <>
                    <div className='px-2 py-3'>
                      <div className='flex justify-start items-center py-1'>
                        <div className='relative '>
                          <img
                            src={product.data.image}
                            alt={product.data.name}
                            className=' object-cover object-center h-32 w-32'
                          />
                        </div>
                        <div className='flex flex-col p-2'>
                          <span>{product.data.name}</span>
                          <span>${product.data.price}</span>
                        </div>
                      </div>
                      <div>Total: ${product.data.price * product.count}</div>
                    </div>
                  </>
                );
              })}
              <hr />
            </div>
          </div>

          <div className='h-[25%] w-[33%] flex flex-col justify-evenly self-center text-lg'>
            <h2 className='font-semibold text-xl'>Order summary</h2>
            <p className='w-full h-[1px] bg-dark'></p>
            <div className='flex justify-between'>
              <span>Subtotal:</span>
              <span>${amount}</span>
            </div>
            <div>
              <div className='flex justify-between'>
                <span>Total:</span>
                <span>${amount}</span>
              </div>
              <button onClick={handleClick}></button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Cart;
