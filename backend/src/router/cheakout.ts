import { cheakout } from '../controller/cheakout';
import express, { Router } from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';

export const cheakoutRoute: Router = express.Router();

cheakoutRoute.post(`/cheakout`, AuthMiddleware, cheakout);
