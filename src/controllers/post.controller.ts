import express from 'express';
import { body, validationResult, param } from 'express-validator';
import { PostModel } from '../models/post.model';
import redis from '../config/redis';
const router = express.Router();
import { Request, Response } from 'express';
router.get('/posts', async (req: Request, res: Response) => {
  try {
    redis.get('Posts', async (err: Error, post: string | null) => {
      if (err) {
        res.status(500).send('error from cache');
      }
      if (post) {
        res.status(200).send({ posts: JSON.parse(post), redis: true });
      } else {
        const AllPosts = await PostModel.find().lean().exec();
        redis.set('Posts', JSON.stringify(AllPosts));
        res.status(200).send({ posts: AllPosts, redis: false });
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//post
router.post(
  '/create/post',
  body('title').notEmpty().isLength({ min: 3, max: 50 }),
  body('body').notEmpty().isLength({ min: 3, max: 50 }),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        const PostData = await PostModel.create(req.body);
        const AllPosts = await PostModel.find().lean().exec();
        res.status(200).send({ post: PostData });
        redis.set('Posts', JSON.stringify(AllPosts));
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error });
    }
  }
);

//update
router.patch(
  '/update/post/:id',
  param('id').notEmpty(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        const UpdatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        const AllPost = await PostModel.find().lean().exec();
        redis.set('Posts', JSON.stringify(AllPost));
        res.status(200).send(UpdatedPost);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

//delete
router.delete('/delete/post/:id', async (req: Request, res: Response) => {
  try {
    const DeletedPost = await PostModel.findByIdAndDelete(req.params.id);
    const AllPosts = await PostModel.find().lean().exec();
    redis.set(`Post`, JSON.stringify(AllPosts));
    res.status(200).send(DeletedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
