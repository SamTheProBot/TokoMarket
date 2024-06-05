import { Request, Response } from 'express';
import Product from '../model/product';

export const getallproducts = async (req: Request, res: Response) => {
  const getitem = await Product.find({});
  console.log(getitem);
};
