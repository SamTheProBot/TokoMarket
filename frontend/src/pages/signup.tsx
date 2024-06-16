import axios from 'axios';
import { useState } from 'react';
import { IuserCradential } from '../util/types/signup';
import { useNavigate, Link } from 'react-router-dom';
const BACKEND_URL = 'http://localhost:5000/api/v1';

const Signup = () => {
  const navigate = useNavigate();
  const [cradential, setCradential] = useState<IuserCradential>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        cradential
      );
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate(`/home`);
      }
    } catch (e) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <div className=' bg-[url(/signup.jpg)] bg-cover bg-center bg-no-repeat '>
        <div className='flex justify-center items-center h-[94vh] w-full backdrop-brightness-[.4] backdrop-blur-sm'>
          <section className='flex flex-col justify-evenly items-center min-w-[30rem] h-[28rem] py-12 backdrop-blur-lg px-12 rounded-md border-2 border-dark text-dark backdrop-brightness-150'>
            <h1 className='text-3xl h-[25%] py-4 px-4'>Branch Out With Us</h1>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col justify-evenly items-center h-[75%]'>
              <label className='flex flex-col'>
                Name
                <input
                  className='border-mid bg-white px-1 border-2 rounded-[3px]'
                  type='text'
                  name='name'
                  value={cradential?.name}
                  onChange={handleChange}
                />
              </label>
              <label className='flex flex-col'>
                Email
                <input
                  className='border-mid bg-white px-1 border-2 rounded-[3px]'
                  type='text'
                  name='email'
                  value={cradential?.email}
                  onChange={handleChange}
                />
              </label>
              <label className='flex flex-col'>
                Password
                <input
                  className='border-mid bg-white px-1 border-2 rounded-[3px]'
                  type='password'
                  name='password'
                  value={cradential?.password}
                  onChange={handleChange}
                />
              </label>
              <div className='flex flex-col justify-center items-center'>
                <button
                  type='submit'
                  className='py-2 px-6 text-back bg-mid rounded-md my-4'>
                  SignUp
                </button>
                <Link to={'/login'} className='text-sm'>
                  Already a User?
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Signup;
