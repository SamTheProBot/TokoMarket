import express, { Router } from 'express';
import { addItem, editItem, clearItem, getItem, get } from '../controller/cart';
import { cheakout } from '../controller/cheakout';
import { AuthMiddleware } from '../middleware/authMiddleware';

export const cartRoute: Router = express.Router();

cartRoute.get('/getitem', AuthMiddleware, getItem);
cartRoute.post('/additem', AuthMiddleware, addItem);
cartRoute.patch('/edititem', AuthMiddleware, editItem);
cartRoute.delete('/clearitem', AuthMiddleware, clearItem);
cartRoute.get(`/get`, get);

// cartRoute.post(`/cheakout`, AuthMiddleware, cheakout);

// "cart": [
//     {
//       "productId": "666882b9f5d43cf3f1307b10",
//       "count": 2,
//       "_id": {
//         "$oid": "667fc4d4454beab35e977836"
//       }
//     },
//     {
//       "productId": "666882b9f5d43cf3f1307b17",
//       "count": 1,
//       "_id": {
//         "$oid": "667fc511454beab35e97783b"
//       }
//     }
//   ],
