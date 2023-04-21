import { Post, PostModel } from '../models/post.model';
import redis from '../../src/config/redis';
import { fetchDataRedis } from '../rediscontrolls/postGetRedis';

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
  const postData = await PostModel.create(postInfo);
  const allPosts = await PostModel.find()
  redis.set('Posts', JSON.stringify(allPosts));
  return postData;
};
export const getPostsService = async (limit: number, page: number) => {
  const data = await fetchDataRedis('Posts');
  if (data) {
    const dataToSend = {
      data,
      cached: true
    }
    return dataToSend
  } else {
    const mydata = await PostModel.find().limit(limit).skip((page - 1) * limit)
    const datatosend = {
      data: mydata,
      cached: false
    }
    redis.set('Posts', JSON.stringify(data), 'EX', 60);
    return datatosend
  }
};

export const updatePostService = async (data: Post, id: string): Promise<Post> => {
  const UpdatedPost = await PostModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  redis.del('Posts');
  return UpdatedPost;
};

export const deletePostService = async (id: string): Promise<Post> => {
  const DeletedPost = await PostModel.findByIdAndDelete(id);
  return DeletedPost;
};