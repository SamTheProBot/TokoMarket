import CartSchema from '../model/cart';
import { ExtendedRequset } from '../types/express';
import { Response } from 'express';

export const cheakout = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;

  try {
    const userCart = await CartSchema.find({ userId: userId });
  } catch (e) {
    res.status(500).json({ message: 'server error' });
  }
};

// const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));
