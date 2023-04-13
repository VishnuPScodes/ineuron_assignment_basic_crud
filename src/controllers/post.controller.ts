import express from 'express';
import {body,validationResult} from 'express-validator';
import { PostModel } from '../models/post.model';
import redis from '../config/redis'
const router=express.Router();

router.get("/", async (req, res) => {
    console.log('here')
  try {
    redis.get("Posts", async (err:any, post:any) => {
      if (err) {
        res.status(500).send("error from cache");
      }
      if (post) {
        res.status(200).send({ posts: JSON.parse(post), redis: true });
      } else {
        const AllPosts = await PostModel.find().lean().exec();
        redis.set("Posts", JSON.stringify(AllPosts));
        res.status(200).send({ posts: AllPosts, redis: false });
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//post
router.post(
  "/",
  body("title").notEmpty().isLength({ min: 3, max: 50 }),
  body("body").notEmpty().isLength({ min: 3, max: 50 }),
  async (req, res) => {
    try {
      const PostData = await PostModel.create(req.body);
      redis.set('myPosts',JSON.stringify(PostData))
    } catch (error) {}
  }
);
router.get('/',async (req,res)=>{
    res.send('yes');
})

export default router;