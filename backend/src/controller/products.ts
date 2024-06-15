import { Request, Response, query } from 'express';
import ProductSchema from '../model/product';

export const getProducts = async (req: Request, res: Response) => {
  const { category, price, page, sort } = req.query;
  let parsePrice = parseFloat(price as string);
  let parsePage = parseInt(page as string);
  let sortOrder: 1 | -1 = sort === 'asc' ? 1 : -1;
  try {
    if (isNaN(parsePage)) {
      parsePage = 0;
    }
    if (isNaN(parsePrice)) {
      parsePrice = Infinity;
    }
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    filter.price = { $lte: parsePrice };

    const getitem = await ProductSchema.find(filter)
      .limit(12)
      .sort({ price: sortOrder })
      .skip(parsePage * 10);

    res.status(200).json({ getitem, length: getitem.length });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};

export const productPage = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    if (!productId)
      return res.status(404).json({ message: `invalid parameter` });
    const getitem = await ProductSchema.findById({ _id: productId });
    res.status(200).json(getitem);
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};
