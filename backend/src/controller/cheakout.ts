import { ExtendedRequset } from '../types/express';
import { Response } from 'express';
import ProductSchema from '../model/product';

export const buyone = async (req: ExtendedRequset, res: Response) => {
  const { productId } = req.body;
  const userId = req.user;

  if (!productId || !userId)
    return res.status(400).json({ message: `invalid userId and productId` });

  try {
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }

  res.json({ message: `workong` }).status(200);
};

export const cheakout = async (req: ExtendedRequset, res: Response) => {
  res.json({ message: 'working' }).status(200);
};
