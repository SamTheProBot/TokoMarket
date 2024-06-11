import { Request, Response, NextFunction } from 'express';
import { Jwt } from 'jsonwebtoken';

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.header.authorization;

  if (!headerToken) return res.status(404).json({ message: `token missing` });

  const token = headerToken.split(' ')[1];

  try {
    const decode = Jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (e) {
    throw e;
  }
};
