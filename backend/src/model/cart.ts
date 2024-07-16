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
          unique: true,
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
