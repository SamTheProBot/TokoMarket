import { Response } from 'express';
import { ExtendedRequset } from '../types/express';
import ProductSchema from '../model/product';
import CartSchema from '../model/cart';

export const getItem = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;

  if (!userId) return res.status(404).json({ message: 'invalid userId' });

  try {
    const cartItem = await CartSchema.find({ _id: userId });
    if (cartItem.length <= 0)
      return res.status(200).json({ message: 'cart is empty' });

    res.status(200).json(cartItem);
  } catch (e) {
    res.status(400).json({ message: 'server error ' });
  }
};

export const addItem = async (req: ExtendedRequset, res: Response) => {
  const { productId, count } = req.body;
  const userId = req.user._id;
  if (!count || !productId || !userId)
    return res
      .status(400)
      .json({ message: `invalid productId or count or userId` });

  try {
    const getItem = await ProductSchema.findOne({ _id: productId });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    let userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart) userCart = await CartSchema.create({ userId: userId });

    userCart.cart.push({ productId: productId, count: count });
    await userCart.save();

    res.json({ message: 'product added' });
  } catch (e) {
    res.status(404).json({ message: `server error`, error: e.message });
  }
};

export const editItem = async (req: ExtendedRequset, res: Response) => {
  const { productId, count } = req.body;
  const userId = req.user;

  if (!count || !productId || !userId)
    return res
      .status(400)
      .json({ message: `invalid productId or count or userId` });

  try {
    const getItem = await ProductSchema.findOne({ _id: productId });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    const userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart)
      return res.status(404).json({ message: `user's cart not found` });

    userCart.cart.find((item) => item.productId.toString() == productId).count =
      count;
    await userCart.save();

    res.json({ message: 'product updated' });
  } catch (e) {
    res.status(404).json({ message: `server error`, error: e.message });
  }
};

export const removeItem = async (req: ExtendedRequset, res: Response) => {
  const { productId } = req.body;
  const userId = req.user;

  if (!productId || !userId)
    return res.status(400).json({ message: `invalid productId and userId` });

  try {
    const getItem = await ProductSchema.findOne({ _id: productId });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    const userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart)
      return res.status(404).json({ message: `user's cart not found` });

    const itemIndex = userCart.cart.findIndex((item) => {
      item.productId.toString() === productId;
    });
    userCart.cart.splice(itemIndex, 1);
    await userCart.save();

    res.json({ message: 'product removed' });
  } catch (e) {
    res.status(404).json({ message: `server error`, error: e.message });
  }
};
