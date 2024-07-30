import { Response, Request, NextFunction } from 'express';

const CSP = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    'Content-Security-Policy',
    "img-src 'self' data: https://*.pinimg.com"
  );
  next();
};

export default CSP;
