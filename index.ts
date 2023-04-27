import express from 'express';
import cors from 'cors';
import { connect } from './src/config/db';
import postRouter from './src/routes/posts'
import reportRouter from './src/routes/reports';
import { errorHandler } from './src/middlewares/errorhandler';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/posts', postRouter);
app.use('/reports', reportRouter);

app.listen(3005, async () => {
  try {
    await connect();
    console.log('listening to the port 3000');
  } catch (error) {
    console.log(error);
  }
});
