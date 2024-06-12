import { Request, Response } from 'express';
import ProductSchema from '../model/product';

export const getallproducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) - 1;
  if (typeof page != 'number')
    return res.status(404).json({ message: `invalid query` });

  const getitem = await ProductSchema.find({}).limit(10).skip(page);
  res.status(200).json({ getitem, length: getitem.length });
};

export const getitem = async (req: Request, res: Response) => {
  const { page, category, price } = req.query;
};

export const productPage = async (req: Request, res: Response) => {};
