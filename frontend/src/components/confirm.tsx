import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypedDispatch } from '../app/hooks';
import { logOut } from '../features/userSlice';
import axios from 'axios';
import {
  FRAMER_CONFIR,
  FRAMER_CONFIR_BACKGROUND,
} from '../util/animation/popup_confir';

const BACKEND_URL = 'http://localhost:5000/api/v1';

const Confirm = (setIsOpen: any) => {
  const [password, SetPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const handleChange = (e: any) => {
    SetPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/deleteAccount`,
        { password: password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(logOut());
        navigate(`/`);
      }
    } catch (e) {
      alert('Error while Deleting your account');
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.section
          className='absolute top-0 right-0 h-full w-full backdrop-brightness-50 backdrop-blur-sm'
          {...FRAMER_CONFIR_BACKGROUND}>
          <motion.div
            {...FRAMER_CONFIR}
            className='absolute top-[25%] right-[35%] transform -translate-x-1/2 -translate-y-1/2 h-[40%] w-[30%] bg-mid dark:bg-dark rounded-md'>
            <div className='h-full w-full flex justify-evenly items-center'>
              <form
                onSubmit={handleSubmit}
                className='h-[50%] w-[70%] flex flex-col justify-evenly items-center'>
                <input
                  className='border-2 rounded-sm border-dark dark:border-light h-8 p-1 w-64'
                  onChange={handleChange}
                  type='text'
                  value={password}
                  name='pass'
                  placeholder='your password'
                />
                <div className='flex'>
                  <button
                    className='w-44 h-10 mx-1 rounded-full border-2 border-dark'
                    type='submit'>
                    Confirm
                  </button>
                  <button
                    type='button'
                    className='w-44 h-10 mx-1 rounded-full border-2 border-mid dark:border-dark text-mid dark:text-dark bg-dark dark:bg-light'
                    onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Confirm;
