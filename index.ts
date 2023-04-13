
import express from 'express';
import cors from 'cors';
import { connect } from './src/config/db';
import postController from './src/controllers/post.controller'
const app =express();
app.use(express.json());
app.use('/posts',postController);

app.listen(3000,async()=>{
  try {
    await connect();
    console.log('listening to the port 3000');
  } catch (error) {
    console.log('error',error)
  }
})