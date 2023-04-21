import { PostModel } from '../models/post.model';
import redis from '../config/redis';

export const fetchDataRedis = (key: string) => {
  return new Promise((resolve, reject) => {
    redis.get(key, async (err: Error, post: string | null) => {
      if (err) {
        const data = await PostModel.find();
        await redis.set('Posts', JSON.stringify(data));
        resolve(null);
      }
      if (post!=='null') {
        resolve(JSON.parse(post));
      } else {
       
        const data = await PostModel.find()
        //redis.del('Posts');
        redis.set('Posts', JSON.stringify(data));
        resolve(data);
      }
    });
  });
};

export const RemoveCache =(key:string) => {
  redis.del(key)
};
