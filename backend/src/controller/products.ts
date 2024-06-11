import { Request, Response } from 'express';
import ProductSchema from '../model/product';

export const getallproducts = async (req: Request, res: Response) => {
  const getitem = await ProductSchema.find({});
  res.status(200).json({ getitem });
};

export const getitem = async (req: Request, res: Response) => {
  const { page, category, price } = req.query;
};
