import { useEffect, useState } from 'react';
import { IproductsData } from '../util/types/products';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:5000/api/v1';

const Product = () => {
  const [count, setCount] = useState<string>('1');
  const [data, setData] = useState<IproductsData>();

  useEffect(() => {
    const getitem = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/plant/666882b9f5d43cf3f1307b12`
        );
        console.log(response);
        setData(response.data);
      } catch (e) {
        throw e;
      }
    };
    getitem();
  }, []);

  return (
    <>
      <div className='bg-black/50 backdrop-blur-md absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%]'>
        <div className='p-16 h-full flex flex-col justify-center items-center'>
          <div className='flex flex-row w-full h-[26rem] items-center'>
            <div className=' h-[100%] w-[30%] flex justify-center'>
              <img
                src={data?.image}
                alt={data?.name}
                className='h-[100%] border-2 border-mid rounded-md'
              />
            </div>
            <div className='flex flex-col items-center w-[70%] px-10 h-[90%] text-back'>
              <span className='text-3xl'>{data?.name}</span>
              <span className='text-2xl'>Price~ {data?.price}</span>
              <span className='text-xl'>{data?.description}</span>
              <span className='text-xl'>{data?.category}</span>
              <span className='text-xl'>
                {data?.features.map((item: string) => `${item}, `)}
              </span>
            </div>
          </div>
          <div>
            <label>Count: </label>
            <select
              name='count'
              id='count'
              onChange={(e) => setCount(e.target.value)}
              className='px-2 py-1 rounded-lg'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <button className='bg-mid px-6 py-1 rounded-xl'>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
