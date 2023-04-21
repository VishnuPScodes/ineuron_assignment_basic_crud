import { Request, Response } from 'express';
import { RemoveCache } from '../rediscontrolls/postGetRedis';
import {
  deletePostService,
  getPostsService,
  createPost,
  updatePostService,
} from '../services/post.service';

export const postPosts = async (req: Request, res: Response) => {
  const { title, body, author } = req.body;
  const response = await createPost(title, body, author);
  res.send(response);
};

export const getPosts = async (req: Request, res: Response) => {
  const limit=5
  const page = Number(req.query.page) |1;
  const posts = await getPostsService(limit,page);
  res.send(posts);
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, body, author } = req.body;
  const data = { title, body, author };
  const response = await updatePostService(data, id);
  res.send(response);
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await deletePostService(id);
  RemoveCache('Posts')
  res.send(response);
};
