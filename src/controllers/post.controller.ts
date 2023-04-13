import express from 'express';
import {body,validationResult} from 'express-validator';
import { PostModel } from '../models/post.model';
import redis from '../config/redis'
const router=express.Router();

router.get("/", async (req, res) => {
  try {
    redis.get("allPosts", async (err:any, post:any) => {
      if (err) {
        res.status(500).send("error from cache");
      }
      if (post) {
        res.status(200).send({ posts: JSON.parse(post), redis: true });
      } else {
        const AllPosts = await PostModel.find().lean().exec();
        redis.set("allPosts", JSON.stringify(AllPosts));
        res.status(200).send({ posts: AllPosts, redis: false });
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


