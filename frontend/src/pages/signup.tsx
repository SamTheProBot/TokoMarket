import axios from 'axios';
import { useState } from 'react';

interface userCradential {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [cradential, setCradential] = useState<userCradential>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCradential({
      ...cradential,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      axios.post(`/`, cradential);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-[95vh] w-full bg-back'>
        <section className='flex flex-col justify-evenly items-center max-w-96 h-[60%] py-8 px-16 rounded-lg border-2 border-dark text-dark'>
          <h1 className='text-3xl h-[25%] py-2 my-2 px-4'>
            Sign Up to <br /> Get Started
          </h1>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-evenly items-center h-[75%]'>
            <label className='flex flex-col'>
              Name
              <input
                className='bg-white focus:border-light border-light  border-[1px] rounded-sm'
                type='text'
                name='name'
                value={cradential?.name}
                onChange={handleChange}
              />
            </label>
            <label className='flex flex-col'>
              Email
              <input
                className='bg-white focus:border-light border-light  border-[1px] rounded-sm'
                type='text'
                name='email'
                value={cradential?.email}
                onChange={handleChange}
              />
            </label>
            <label className='flex flex-col'>
              Password
              <input
                className='bg-white focus:border-light border-light  border-[1px] rounded-sm'
                type='password'
                name='password'
                value={cradential?.password}
                onChange={handleChange}
              />
            </label>
            <button
              type='submit'
              className='py-2 px-6 text-back bg-mid rounded-md my-6'>
              Login
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Signup;
