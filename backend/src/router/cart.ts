import express, { Router } from 'express';
import { addItem, editItem, removeItem, getItem } from '../controller/cart';

export const cartRoute: Router = express.Router();

cartRoute.get('/getitem', getItem);
cartRoute.post('/additem', addItem);
cartRoute.patch('/edititem', editItem);
cartRoute.delete('/removeitem', removeItem);
