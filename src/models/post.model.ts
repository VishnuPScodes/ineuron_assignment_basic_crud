import mongoose from 'mongoose';


interface Post {
    title:string,
    body:string,
    author:string,
}

const PostSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel=mongoose.model<Post>('post',PostSchema);
