import { useEffect, useState } from 'react';
import { IproductsData } from '../util/types/products';
import Product from '../components/product';
import axios from 'axios';
import { useScrollTop } from '../hooks/scrollToTop';
import { FRAMER_PAGE_TRANSITION } from '../util/animation/page';
import { motion, AnimatePresence } from 'framer-motion';
const BACKEND_URL = 'http://localhost:5000/api/v1';

const Home = () => {
  useScrollTop();
  const [data, setData] = useState<IproductsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>({
    page: 1,
    category: null,
    price: null,
    sort: null,
  });

  useEffect(() => {
    const calldata = async () => {
      try {
        let response = await axios.get(`${BACKEND_URL}/getproduct`, {
          params: { ...options },
        });
        setData(response.data.getitem);
        setIsLoading(true);
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    };
    calldata();
  }, [options.page]);

  return (
    <>
      <section className='h-[90vh] w-full bg-mid pt-[4.5rem]'>
        <AnimatePresence>
          <motion.div
            {...FRAMER_PAGE_TRANSITION}
            className=' bg-[url(/imageClip.jpg)] flex justify-center items-center overflow-hidden bg-cover bg-center bg-no-repeat relative h-full w-full backdrop-blur-lg'>
            <div className='h-[40%] w-[50%] text-light flex flex-col justify-evenly items-center text-xl font-normal font-heading'>
              <span className='tracking-widest text-7xl'>VERDANT MARKET</span>
              <span className='font-normal'>one spot for all plants</span>
              <br />
              <button className='w-48 h-12 bg-dark rounded-sm font-normal'>
                Shop now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <section className='h-[37vh] w-full flex justify-center items-center bg-light dark:bg-dark text-dark dark:text-light font-light font-context mb-3'>
        <AnimatePresence>
          <motion.div className='h-[60%] w-[45%] flex flex-col justify-around items-center'>
            <div className='font-normal text-2xl tracking-widest'>
              OUR COLLECTION
            </div>
            <div className=' text-center'>
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font. I'm a great place for you to
              tell a story and let your users know a little more about you.
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <section className='grid grid-cols-3 gap-3 bg-mid dark:bg-dark'>
        {data.map((item) => {
          return <Product {...item}></Product>;
        })}
      </section>
    </>
  );
};

export default Home;
