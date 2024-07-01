import express, { Router } from 'express';
import {
  Userlogin,
  UserSignup,
  UserRemove,
  Userlogout,
} from '../controller/auth';
import { AuthMiddleware } from '../middleware/authMiddleware';

export const authRoute: Router = express.Router();

authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
authRoute.delete('/deleteAccount', AuthMiddleware, UserRemove);
authRoute.delete(`/logout`, Userlogout);
