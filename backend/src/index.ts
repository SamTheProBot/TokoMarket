import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import { productRoute } from './router/products';
import { authRoute } from './router/auth';
import { cartRoute } from './router/cart';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || process.env.LOCALPORT;

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static('../frontend/dist'));

app.use('/api/v1/', productRoute);
app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/cart/', cartRoute);

const Start = () => {
  app.listen(port, async () => {
    try {
      await mongoose.connect(process.env.MONGO_ATLAS),
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
