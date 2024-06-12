import CartSchema from '../model/cart';
import { ExtendedRequset } from '../types/express';
import { Response } from 'express';

export const cheakout = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;

  try {
    const userCart = await CartSchema.find({ userId: userId });
  } catch (e) {
    res.status(404).json({ message: 'server error' });
  }
};
