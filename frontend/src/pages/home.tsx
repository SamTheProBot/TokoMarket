import { useEffect, useState } from 'react';
import { IproductsData } from '../util/types/products';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:5000/api/v1';

const Home = () => {
  const [data, setData] = useState<IproductsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [sort, setSort] = useState();

  useEffect(() => {
    const calldata = async () => {
      try {
        let response = await axios.get(`${BACKEND_URL}/plant/getproduct`, {
          params: { category, price, page, sort },
        });
        setData(response.data.getitem);
        setIsLoading(true);
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    };
    calldata();
  }, [page]);

  console.log(data);

  const Card: React.FC<IproductsData> = ({ name, price, category, image }) => {
    return (
      <>
        <article className='flex flex-col justify-center items-center bg-light shadow-md rounded-lg p-4 h-auto w-auto'>
          <div className=' h-auto '>
            <img src={image} alt={name} className=' aspect-[3/4] h-64' />
          </div>
          <div className='flex flex-row justify-evenly w-full min-h-10'>
            <div className='flex flex-col'>
              <span>{name}</span>
              <span>{category}</span>
            </div>
            <div>
              <span>{price}</span>
            </div>
          </div>
        </article>
      </>
    );
  };

  return (
    <div className='m-16 h-auto container'>
      <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
        {isLoading && (
          <>
            {data?.map((plant) => (
              <Card key={plant.id} {...plant} />
            ))}
          </>
        )}
      </section>
      <section className=''>
        <button onClick={() => setPage((prev) => prev + 1)}>{`<--`}</button>
        {page + 1}
        <button onClick={() => setPage((prev) => prev - 1)}>{`-->`}</button>
      </section>
    </div>
  );
};

export default Home;
