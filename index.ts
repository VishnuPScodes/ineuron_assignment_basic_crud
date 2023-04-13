
import express from 'express';
import cors from 'cors';
import { connect } from './src/config/db';

const app =express();
app.use(express.json());


app.listen(3000,async()=>{
  try {
    await connect();
    console.log('listening to the port 3000');
  } catch (error) {
    console.log('error',error)
  }
})