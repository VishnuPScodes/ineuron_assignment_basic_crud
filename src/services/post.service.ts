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
  const PostData = await PostModel.create(postInfo);
  const AllPosts = await PostModel.find()
  redis.set('Posts', JSON.stringify(AllPosts));
  return PostData;
};

export const getPostsService = async () => {
  const data = await fetchDataRedis('Posts');
  console.log('data from redis',data)
  if (data) {
    const datatosend={
      data,
      redis:true
    }
    return datatosend
  } else {
    const mydata = await PostModel.find()
    redis.set('Posts', JSON.stringify(data));
    console.log('finding data',data);
    return mydata
  }
};

export const updatePostService = async (data:Post, id:string): Promise<Post> => {
  const UpdatedPost = await PostModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  const AllPost = await PostModel.find()
  // redis.set('Posts', JSON.stringify(AllPost));
  // CLEAR THE CACHE
  return UpdatedPost;
};

export const deletePostService = async (id: string):Promise<Post> => {
  const DeletedPost = await PostModel.findByIdAndDelete(id);
  const AllPosts = await PostModel.find()
  redis.set(`Posts`, JSON.stringify(AllPosts));
  return DeletedPost;
};