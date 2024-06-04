import Navbar from '../components/navbar';
import PLANT_DATA from '../Data';
import { productsCard } from '../util/types/products';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='m-16 border-2 border-black h-auto container'>
        <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
    <article className='flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-4'>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        <span>{name}</span>
        <span>{price}</span>
        <span>{category}</span>
      </div>
    </article>
  );
};

export default Home;
