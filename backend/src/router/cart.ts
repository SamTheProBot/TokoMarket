import express, { Router } from 'express';
import {
  addItem,
  // editItem,
  clearItem,
  clearCart,
  getItem,
  get,
} from '../controller/cart';
import { AuthMiddleware } from '../middleware/authMiddleware';

export const cartRoute: Router = express.Router();

cartRoute.get('/getitem', AuthMiddleware, getItem);
cartRoute.post('/additem', AuthMiddleware, addItem);
// cartRoute.patch('/edititem', AuthMiddleware, editItem);
cartRoute.patch('/clearitem', AuthMiddleware, clearItem);
cartRoute.delete('/clearcart', AuthMiddleware, clearCart);
cartRoute.get(`/get`, get);
