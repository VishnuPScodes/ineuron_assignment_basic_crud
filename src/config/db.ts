import mongoose from 'mongoose';

export const connect = () => {
  return mongoose.connect(
    process.env.URL
  );
};
