import { useState } from 'react';

const Product = ({ image, name, price, id }: any) => {
  const [isHover, setIsHover] = useState<any>(false);
  const handleClick: any = (id: any) => {
    console.log(id);
  };

  return (
    <>
      <article
        className='bg-mid font-context duration-500'
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}>
        <div className='relative overflow-hidden h-80 bg-slate-400'>
          <img
            className='object-center object-contain h-fit'
            src={image}
            alt={name}
          />
        </div>
        <div className='h-32 flex flex-col justify-around items-center pt-3'>
          <div className='font-normal'>{name}</div>
          <div className='font-light text-dark/70'>${price}</div>
          <button
            onClick={handleClick(id)}
            className={`${
              isHover ? `bg-dark` : `bg-base`
            } w-full text-mid h-10 rounded-sm`}>
            Add to Carts
          </button>
        </div>
      </article>
    </>
  );
};

export default Product;
