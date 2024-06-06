import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { productRouter } from './router/products';
import { authRouter } from './router/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || process.env.LOCALPORT;

app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.json());

app.use('/api/v1/', productRouter);
app.use('/api/v1/', authRouter);

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
