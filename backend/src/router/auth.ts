import express, { Router } from 'express';
import { Userlogin, UserSignup, UserRemove } from '../controller/auth';
import { AuthMiddleware } from '../middleware/authMiddleware';

export const authRoute: Router = express.Router();

authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
authRoute.delete('/deleteAccount', AuthMiddleware, UserRemove);
