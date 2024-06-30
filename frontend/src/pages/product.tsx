import React, { useEffect, useState } from 'react';
import { IproductsData } from '../util/types/products';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:5000/api/v1';

const Product = () => {
  const [count, setCount] = useState<number>();
  const [data, setData] = useState<IproductsData>();

  useEffect(() => {
    const getitem = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/666882b9f5d43cf3f1307b12`
        );
        setData(response.data);
      } catch (e) {
        throw e;
      }
    };
    getitem();
  }, []);

  return (
    <>
      <section>
        <div></div>
        <div></div>
      </section>
    </>
  );
};
export default Product;
