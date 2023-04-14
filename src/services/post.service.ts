import { Post, PostModel } from '../models/post.model';
import redis from '../../src/config/redis';
import { promiseFunction } from '../rediscontrolls/postGetRedis';

export const PostPostService = async (
  title: string,
  body: string,
  author: string
): Promise<Post> => {
  const postInfo = {
    title,
    body,
    author,
  };
  const PostData = await PostModel.create(postInfo);
  const AllPosts = await PostModel.find().lean().exec();
  redis.set('Posts', JSON.stringify(AllPosts));
  return PostData;
};

export const PostGetService = async () => {
  const data = await promiseFunction('Posts');
  if (data) {
    return data
  } else {
    const mydata = await PostModel.find().lean().exec();
    redis.set('Posts', JSON.stringify(data));
    return mydata
  }
};

export const PostUpdateService = async (data:Post, id:string): Promise<Post> => {
  const UpdatedPost = await PostModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  const AllPost = await PostModel.find().lean().exec();
  redis.set('Posts', JSON.stringify(AllPost));
  return UpdatedPost;
};

export const PostDeleteService = async (id: string):Promise<Post> => {
  const DeletedPost = await PostModel.findByIdAndDelete(id);
  const AllPosts = await PostModel.find().lean().exec();
  redis.set(`Post`, JSON.stringify(AllPosts));
  return DeletedPost;
};