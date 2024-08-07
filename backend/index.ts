import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import RateLimit from './src/middleware/ratelimiter';
// import path from 'path';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import CSP from './src/middleware/csp';
import { productRoute } from './src/router/products';
import { authRoute } from './src/router/auth';
import { cartRoute } from './src/router/cart';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || process.env.LOCALPORT;

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(CSP);
app.use(helmet());

app.use('/api/v1/', productRoute);
app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/cart/', cartRoute);
app.use('/api/', RateLimit);
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const Start = () => {
  app.listen(port, async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI),
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        };
    } catch (e) {
      console.error(e);
    }
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

Start();
