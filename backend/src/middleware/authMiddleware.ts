import { Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { ExtendedRequset } from '../types/express';

export const AuthMiddleware = (
  req: ExtendedRequset,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  // const headerToken = req.headers.authorization;
  // if (!headerToken || typeof headerToken !== 'string')
  //   return res.status(404).json({ data: headerToken });
  // const token = headerToken.split(' ')[1];

  if (!token)
    return res
      .status(404)
      .json({ message: `token not present or invalid token` });

  try {
    const decode: any = Jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode._id;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: `something went wrong ` });
  }
};
