import { Post, PostModel } from '../models/post.model';
import redis from '../../src/config/redis';
import { setRedisData } from '../rediscontrolls/postGetRedis';

export const createPost = async (
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
  const AllPosts = await PostModel.find()
  redis.set('Posts', JSON.stringify(AllPosts));
  return PostData;
};

export const getPostsService = async () => {
  const data = await setRedisData('Posts');
  if (data) {
    return data
  } else {
    const mydata = await PostModel.find()
    redis.set('Posts', JSON.stringify(data));
    return mydata
  }
};

export const updatePostService = async (data:Post, id:string): Promise<Post> => {
  const UpdatedPost = await PostModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  const AllPost = await PostModel.find()
  redis.set('Posts', JSON.stringify(AllPost));
  return UpdatedPost;
};

export const deletePostService = async (id: string):Promise<Post> => {
  const DeletedPost = await PostModel.findByIdAndDelete(id);
  const AllPosts = await PostModel.find()
  redis.set(`Posts`, JSON.stringify(AllPosts));
  return DeletedPost;
};