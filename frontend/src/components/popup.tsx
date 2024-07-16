import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { FRAMER_POPUP } from '../util/animation/popup_confir';

const PopUP = ({
  children,
  condition,
}: {
  children: string;
  condition: boolean;
}) => {
  return (
    <>
      <AnimatePresence>
        <motion.section
          {...FRAMER_POPUP}
          className={`rounded-2xl w-60 h-12 lg:w-72 absolute bottom-16 right-10 font-context text-xl border-2 ${
            condition
              ? `bg-green-500 border-green-600`
              : ` bg-red-400 border-red-500`
          }`}>
          <div className='h-[95%] w-[80%] flex justify-evenly items-center'>
            <div className='h-full text-2xl  flex justify-center items-center '>
              {condition ? '✔️' : '❌'}
            </div>
            <div className='h-full w-[80%] flex justify-center items-center'>
              {children}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default PopUP;
