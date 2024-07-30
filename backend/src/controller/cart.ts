import { Response } from 'express';
import { ExtendedRequset } from '../types/express';
import ProductSchema from '../model/product';
import CartSchema from '../model/cart';

export const getItem = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;
  if (!userId) return res.status(404).json({ message: 'invalid userId' });

  try {
    const cartItem = await CartSchema.findOne({
      userId: userId,
    });

    if (cartItem.cart.length <= 0) return res.status(200).json([]);

    const data = await Promise.all(
      cartItem.cart.map(async (item) => {
        const { _id, name, image, price } = await ProductSchema.findById(
          item.productId
        ).select('id_ name image price');

        return { _id, name, image, price, count: item.count };
      })
    );
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'server error ' });
  }
};

export const get = async (req: ExtendedRequset, res: Response) => {
  const userId = `666d86bf18ef157a5213e1f7`;
  if (!userId) return res.status(404).json({ message: 'invalid userId' });
  try {
    const cartItem = await CartSchema.findOne({
      userId: userId,
    });

    if (cartItem.cart.length <= 0) return res.status(200).json([]);

    const data = await Promise.all(
      cartItem.cart.map(async (item) => {
        const { _id, name, image, price } = await ProductSchema.findById(
          item.productId
        ).select('id_ name image price');

        return { _id, name, image, price, count: item.count };
      })
    );
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'server error ' });
  }
};

export const addItem = async (req: ExtendedRequset, res: Response) => {
  const { productId, count } = req.body;
  const userId = req.user;
  if (!count || !productId || !userId)
    return res
      .status(404)
      .json({ message: `invalid productId or count or userId` });

  try {
    const getItem = await ProductSchema.findById({ _id: productId });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    let userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart) userCart = await CartSchema.create({ userId: userId });

    const cartItem = userCart.cart.find((item) => item.productId === productId);
    if (cartItem) cartItem.count += count;
    else
      userCart.cart.push({
        productId: productId,
        count: count,
      });

    await userCart.save();

    res.status(200).json({ message: 'product added' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: `server error` });
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
    const getItem = await ProductSchema.findById({ _id: productId });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    const userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart)
      return res.status(404).json({ message: `user's cart not found` });

    userCart.cart.find((item) => item.productId.toString() == productId).count =
      count;
    await userCart.save();

    res.status(200).json({ message: 'product updated' });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};

export const clearItem = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;

  if (!userId) return res.status(400).json({ message: `invalid userId` });

  try {
    const userCart = await CartSchema.findOne({ userId: userId });

    if (!userCart)
      return res.status(404).json({ message: `user's cart not found` });

    userCart.cart.splice(0, userCart.cart.length);
    await userCart.save();

    res.status(200).json({ message: 'cart empty' });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};
