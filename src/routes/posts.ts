import express from 'express';
import { deletePost, getPosts, postPosts, updatePost } from '../controllers/posts';
const router=express.Router();

router.post('/',postPosts);
router.patch('/:id',updatePost);
router.get('/',getPosts);
router.delete('/delete/:id',deletePost);

export default router