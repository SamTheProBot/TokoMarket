import express, { Router } from 'express';
import { getProducts, productPage } from '../controller/products';

export const productRoute: Router = express.Router();

productRoute.get('/getproduct', getProducts);
productRoute.get('/:productId', productPage);
