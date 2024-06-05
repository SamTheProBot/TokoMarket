import mongoose from 'mongoose';
import { Iproducts } from '../util/product';

const Product = new mongoose.Schema<Iproducts>({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: [{ type: String }],
});

export default mongoose.model('Product', Product);
