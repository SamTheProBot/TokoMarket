import express, { Router } from 'express';
import { getallproducts } from '../controller/products';

export const productRouter: Router = express.Router();

productRouter.get('/getall', getallproducts);
