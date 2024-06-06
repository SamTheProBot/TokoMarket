import { Request, Response } from 'express';
import { IloginUser, IsignupUser } from '../util/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const UserSignup = async (req: Request<IsignupUser>, res: Response) => {
  const { name, password, email } = req.body;
  const headers5 = req.header;
  if (true) {
    res.status(200).json({ message: 'Signup successful', headers5 });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const Userlogin = async (req: Request<IloginUser>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: `please provide email and passwords` });
  }

  const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
    expiresIn: '30d',
  });

  res.json({ User: token });
};
