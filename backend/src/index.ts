import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());

app.use(express.json());

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
