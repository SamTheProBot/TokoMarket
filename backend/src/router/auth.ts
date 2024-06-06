import express, { Router } from 'express';
import { Userlogin, UserSignup } from '../controller/auth';

export const authRouter: Router = express.Router();

authRouter.post('/signup', UserSignup);
authRouter.post('/login', Userlogin);
