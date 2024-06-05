import PLANT_DATA from '../Data';
import { productsCard } from '../util/types/products';

const Home = () => {
  return (
    <>
      <div className='m-16 h-auto container'>
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
          {PLANT_DATA.map((plant) => (
            <Card key={plant.id} {...plant} />
          ))}
        </section>
      </div>
    </>
  );
};

const Card: React.FC<productsCard> = ({ name, price, category, image }) => {
  return (
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
  );
};

export default Home;
