import { ExtendedRequset } from '../types/express';
import { Response } from 'express';

export const cheakout = async (req: ExtendedRequset, res: Response) => {
  res.json({ message: 'working' }).status(200);
};
