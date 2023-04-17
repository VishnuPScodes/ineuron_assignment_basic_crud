import { PostModel } from '../models/post.model';
import redis from '../config/redis'

export const setRedis = (key:string) => {
   return new Promise((resolve, reject) => {
     redis.get(key, async (err: Error, post: string | null) => {
       if (err) {
         const data = await PostModel.find().lean().exec();
         redis.set('Posts', JSON.stringify(data));
         reject(null);
       }
       if (post) {
         resolve(JSON.parse(post));
       } else {
         reject();
       }
     });
   });
 };
