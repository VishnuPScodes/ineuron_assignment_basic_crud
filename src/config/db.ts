import mongoose from "mongoose";

export const connect = () => {
  return mongoose.connect(
    "mongodb+srv://psvishnu373:vishnu@cluster0.mml9ojk.mongodb.net/test"
  );
};
