import express, { Router } from 'express';
import { Userlogin, UserSignup, Test } from '../controller/auth';

export const authRoute: Router = express.Router();

authRoute.post('/signup', UserSignup);
authRoute.post('/login', Userlogin);
authRoute.get('/test', Test);
