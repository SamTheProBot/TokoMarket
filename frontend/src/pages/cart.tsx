import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BACKEND_URL = 'http://localhost:5000/api/v1';

const Cart = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/cart/getitem`, {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data);
      } catch (e) {
        throw e;
      }
    };
    getCartItem();
  }, []);

  const handleClick = () => {};

  return (
    <>
      <motion.section className='min-h-[93vh] w-full flex justify-center items-center font-context text-dark '>
        <div className='h-[80%] w-[40%]  bg-red-200 flex flex-row justify-evenly items-center'>
          <div className='h-[60%] w-[60%]'>
            <div className='h-[20] w-full'>
              My cart
              <hr />
            </div>
            <div className=''>
              {data?.map((product: any) => {
                return (
                  <>
                    <div>
                      <div className='flex justify- items-center'>
                        <div className='relative '>
                          <img
                            src={product.data.image}
                            alt={product.data.name}
                            className=' object-cover object-center h-24 w-24'
                          />
                        </div>
                        <div>
                          <span>{product.data.name}</span>
                          <span>{product.data.price}</span>
                        </div>
                      </div>
                      <div>{product.data.price * product.count}</div>
                    </div>
                  </>
                );
              })}
              <hr />
            </div>
          </div>

          <div className='h-[60%] w-[40%]'>
            <h2>
              Order summary <hr />
            </h2>
            <div className='flex justify-between items-center flex-row'>
              <span>Subtotal</span>
              <span>${}</span>
            </div>
            <div>
              <div>
                <h2>Total</h2>
                <span>${}</span>
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
