import express, { Router } from 'express';
import { getallproducts } from '../controller/products';

export const productRoute: Router = express.Router();

productRoute.get('/getproducts', getallproducts);
