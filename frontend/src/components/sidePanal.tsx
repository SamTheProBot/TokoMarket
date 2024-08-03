import { motion, AnimatePresence } from 'framer-motion';
import { useTypedSelector } from '../app/hooks';
import { cartList } from '../features/cartSlice';
import { panalState } from '../features/extraSlice';
import { FRAMER_SLIDER, FRAMER_SLIDER_ITEM } from '../util/animation/slider';

const SlidePanal = () => {
  const userItem = useTypedSelector(cartList);
  const sidePanal = useTypedSelector(panalState);

  return (
    <>
      <AnimatePresence mode='wait'>
        {sidePanal && (
          <motion.section
            {...FRAMER_SLIDER}
            className='fixed top-1 font-heading right-2 z-20 bg-mid dark:bg-dark border-l-2 border-dark/50 dark:border-mid/50 h-[100vh] w-60 flex flex-col items-center justify-start overflow-x-hidden overflow-y-scroll'>
            <div>
              {userItem.map((item, index) => {
                return (
                  <>
                    <motion.div
                      {...FRAMER_SLIDER_ITEM}
                      key={index}
                      className='p-2 m-3 rounded-lg w-[80%] bg-light/25 flex flex-col items-center justify-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='h-36 w-40 p-2 rounded-md'
                      />
                      <div className='font-medium text-2xl'>{item.name}</div>
                    </motion.div>
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
