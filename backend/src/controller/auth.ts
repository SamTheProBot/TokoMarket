import { Request, Response } from 'express';
import { ExtendedRequset } from '../types/express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import CartSchema from '../model/cart';
import UserSchema from '../model/auth';
import dotenv from 'dotenv';
dotenv.config();

export const UserSignup = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400).json({ message: `please provide all the information` });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await hash(password, salt);

  try {
    const user = await UserSchema.create({
      name: name,
      email: email,
      password: hashed,
    });
    const token = jwt.sign(
      { email: email, _id: user._id },
      process.env.JWT_TOKEN
    );

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: `user created`, access_token: token });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};

export const Userlogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: `please provide email and passwords` });
  }

  try {
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: `user not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: `invalid credentials` });

    const token = jwt.sign(
      { email: email, _id: user._id },
      process.env.JWT_TOKEN
    );
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: `login successful`, access_token: token });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};

export const IsUserLogin = async (req: ExtendedRequset, res: Response) => {
  try {
    const token: undefined | string = req.cookies.access_token;
    if (token != undefined) res.json({ message: `yes` });
    else res.json({ message: `nope` });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};

export const Userlogout = async (req: ExtendedRequset, res: Response) => {
  try {
    res
      .status(200)
      .clearCookie('access_token')
      .json({ message: 'logout successful' });
  } catch (e) {
    res.status(500).json({ message: 'server error' });
  }
};

export const UserRemove = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;
  const { password } = req.body;
  try {
    const user = await UserSchema.findById({ _id: userId });
    if (!user) return res.status(404).json({ message: `user not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: `invalid credentials` });

    await UserSchema.findByIdAndDelete({ _id: userId });
    await CartSchema.findOneAndDelete({ userId: userId });

    res
      .status(200)
      .clearCookie('access_token')
      .json({ message: `user deleted` });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};
