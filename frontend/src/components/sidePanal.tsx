import { motion, AnimatePresence } from 'framer-motion';
import { useTypedSelector, useTypedDispatch } from '../app/hooks';
import { closePanal } from '../features/extraSlice';
import { cartList } from '../features/cartSlice';
import { panalState } from '../features/extraSlice';
import { FRAMER_SLIDER } from '../util/animation/slider';

const SlidePanal = () => {
  const dispatch = useTypedDispatch();
  const userItem = useTypedSelector(cartList);
  const sidePanal = useTypedSelector(panalState);

  return (
    <>
      <AnimatePresence mode='wait'>
        {sidePanal && (
          <motion.section
            {...FRAMER_SLIDER}
            className='fixed top-1 font-heading right-2 z-20 bg-mid dark:bg-dark border-l-2 border-dark/50 dark:border-mid/50 h-[100vh] w-60 flex flex-col items-center justify-start overflow-x-hidden overflow-y-scroll'>
            <div className='flex justify-normal w-full'>
              <button onClick={() => dispatch(closePanal())} className='p-2'>
                <img src='x.svg' alt='X' className='h-10 w-10' />
              </button>
              <h2 className='self-center text-2xl font-medium px-2'>
                {`Your Plants <3`}
              </h2>
            </div>
            <div>
              {userItem.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className='p-1 m-2 rounded-lg w-[80%] bg-light/25 flex flex-col items-center justify-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='h-28 w-32 p-1 rounded-md'
                      />
                      <div className='font-medium text-xl'>{item.name}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default SlidePanal;
