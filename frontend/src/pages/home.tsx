import { useEffect, useState } from 'react';
import { IproductsData } from '../util/types/products';
import axios from 'axios';
import { useScrollTop } from '../hooks/scrollToTop';
const BACKEND_URL = 'http://localhost:5000/api/v1';

const Home = () => {
  const [data, setData] = useState<IproductsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [sort, setSort] = useState();
  useScrollTop(page);

  const handleNext = () => {
    if (data.length >= 12) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (page >= 1) {
      setPage((prev) => prev - 1);
    }
  };
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

  const Card: React.FC<IproductsData> = ({ name, price, category, image }) => {
    return (
      <>
        <article className='flex flex-col w-[100%] justify-center items-center bg-light shadow-md rounded-lg p-4 h-fit'>
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
    <div className='bg-[url(/home.jpg)] bg-cover bg-center bg-no-repeat'>
      <div className='p-16 h-auto flex flex-col justify-center items-center backdrop-brightness-50 backdrop-blur-sm'>
        <section className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 min-h-[100vh]'>
          {isLoading && (
            <>
              {data?.map((plant) => (
                <Card key={plant.id} {...plant} />
              ))}
            </>
          )}
        </section>
        <section className=''>
          <button onClick={handlePrev}>{`<--`}</button>
          {page + 1}
          <button onClick={handleNext}>{`-->`}</button>
        </section>
      </div>
    </div>
  );
};

export default Home;
