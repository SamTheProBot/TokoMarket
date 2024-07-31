import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    cart: [
      {
        productId: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { id: false }
);

export default mongoose.model('CartSchema', CartSchema);
