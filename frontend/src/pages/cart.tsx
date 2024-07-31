import axios from 'axios';
import { IproductsData } from '../util/types/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import Loading from '../components/loading';

const Cart = () => {
  const [isLoading, setLoading] = useState<{ value: boolean; context: string }>(
    {
      value: true,
      context: '',
    }
  );
  const [data, setData] = useState<IproductsData[]>([]);
  const [total, setTotal] = useState<number>(0);

  const handleClearCart = async () => {
    try {
      await axios.delete(`${window.location.origin}/api/v1/cart/clearitem`, {
        withCredentials: true,
      });
    } catch (e) {
      console.error('Error clearing cart items:', e);
      throw e;
    }
  };

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/v1/cart/getitem`,
          {
            withCredentials: true,
          }
        );

        let total = 0;
        response.data.forEach((product: any) => {
          total += product.price * product.count;
        });
        setData(response.data);
        setTotal(Math.ceil(total));
        setLoading({ value: false, context: 'loading' });
      } catch (e: any) {
        console.error('Error fetching cart items:', e);
        setLoading({ value: false, context: 'oops! page not found' });
      }
    };

    getCartItem();
  }, []);
  const handleClick = () => {};

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <Loading height='100' context={`${isLoading.context}`} />
        ) : (
          <motion.section
            {...FRAMER_PAGE_TRANSITION}
            className='h-[93vh] w-full flex justify-center items-center font-context text-dark pt-16'>
            <div className='h-full w-[50%] flex flex-row justify-evenly'>
              <div className='h-full w-[67%]'>
                <div className='h-[10%] w-full flex justify-between items-center'>
                  <div className='h-full w-full font-heading p-3 text-4xl'>
                    My cart
                  </div>
                  {data.length > 0 && (
                    <div
                      onClick={handleClearCart}
                      className='self-end flex justify-center items-center rounded-md border-2 border-red-500 bg-red-400 h-10 w-10 cursor-pointer'>
                      🗑️
                    </div>
                  )}
                </div>
                <p className='w-[40%] h-[1px] bg-dark'></p>

                <div className='h-[90%] overflow-y-scroll scrollbar-hide'>
                  {data.length > 0 ? (
                    data.map((product: any) => (
                      <div key={product.id} className='px-2 py-3'>
                        <div className='flex justify-start items-center py-1'>
                          <div className='relative'>
                            <img
                              src={product.image}
                              alt={product.name}
                              className='object-cover object-center h-32 w-32'
                            />
                          </div>
                          <div className='flex flex-col p-2'>
                            <span>{product.name}</span>
                            <span>${product.price}</span>
                          </div>
                        </div>
                        <div>Total: ${product.price * product.count}</div>
                      </div>
                    ))
                  ) : (
                    <div>No products available.</div>
                  )}
                  <hr />
                </div>
              </div>

              <div className='h-[35%] w-[33%] flex flex-col justify-evenly self-center text-lg'>
                <h2 className='font-semibold text-xl'>Order summary</h2>
                <p className='w-full h-[1px] bg-dark'></p>
                <div className='flex justify-between'>
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>
                <div>
                  <div className='flex justify-between'>
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                  <button
                    onClick={handleClick}
                    className='bg-dark text-mid dark:bg-mid dark:text-dark my-5 h-8 w-full rounded-sm'>
                    Cheak Out
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
