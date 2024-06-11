import { Response, Request } from 'express';
import User from '../model/auth';
import ProductSchema from '../model/product';
import CartSchema from '../model/cart';

export const getItem = async (req: Request, res: Response) => {
  try {
    const cartItem = await CartSchema.find();
    if (cartItem.length <= 0)
      return res.status(200).json({ message: 'cart is empty' });

    res.status(200).json(cartItem);
  } catch (e) {
    res.status(400).json({ message: 'server error' });
  }
};

export const addItem = async (req: Request, res: Response) => {
  const { id, count, userId } = req.body;

  if (!count || !id)
    return res.status(400).json({ message: `invalide id and count` });

  try {
    const getItem = await ProductSchema.findOne({ _id: id });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    let userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart)
      userCart = await CartSchema.create({ userId: userId, cart: [] });
    userCart.cart.push({ productId: id, count: count });

    res.json({ message: 'product added' });
  } catch (e) {
    res.status(404).json({ message: `server error` });
  }
};

export const editItem = async (req: Request, res: Response) => {};

export const removeItem = async (req: Request, res: Response) => {
  const { id, userId } = req.body;

  if (!id) return res.status(400).json({ message: 'invalide id' });
};

//66687bddf1af6b76c6e28ecf
//666882b9f5d43cf3f1307b11
