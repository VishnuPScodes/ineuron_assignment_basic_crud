
import express from 'express';
import cors from 'cors';
import { connect } from './src/config/db';
import postController from './src/controllers/post.controller'
import {errorHandler} from './src/middlewares/errorhandler'
const app =express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/',postController);

app.listen(3000, async () => {
  try {
    await connect();
    console.log('listening to the port 3000');
  } catch (error) {
    console.log(error);
  }
});
