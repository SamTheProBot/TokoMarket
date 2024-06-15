import CartSchema from '../model/cart';
import { ExtendedRequset } from '../types/express';
import { Response } from 'express';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_API);

export const cheakout = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;

  try {
    const userCart = await CartSchema.find({ userId: userId });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5000?success=true`,
      cancel_url: `http://localhost:5000?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (e) {
    res.status(500).json({ message: 'server error' });
  }
};
