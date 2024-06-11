import { Request, Response } from 'express';
import { IloginUser, IsignupUser } from '../types/user';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
import UserSchema from '../model/auth';
dotenv.config();

export const UserSignup = async (req: Request<IsignupUser>, res: Response) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400).json({ message: `please provide all the information` });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await hash(password, salt);

  try {
    await UserSchema.create({
      name: name,
      email: email,
      password: hashed,
    });
    const token = jwt.sign({ email: email }, process.env.JWT_TOKEN);
    res.status(200).json({ message: `user created`, token });
  } catch (e) {
    console.log(`error while creating user ${e.message}`);
  }
};

export const Userlogin = async (req: Request<IloginUser>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: `please provide email and passwords` });
  }

  try {
    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(400).json({ message: `user not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: `invalide credentials` });

    const token = jwt.sign({ email: email }, process.env.JWT_TOKEN);
    res.status(200).json({ message: `login successful`, token });
  } catch (e) {
    res.status(400).json({ message: `error while logging in` });
  }
};

export const Test = async (req: Request, res: Response) => {
  const user = await UserSchema.find({});
  res.status(200).json(user);
};
