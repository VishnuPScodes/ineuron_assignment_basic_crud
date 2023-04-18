import express from 'express';
import { postExpressValidator, validate } from '../middlewares/expressvalidators';
import { deletePost, getPosts, postPosts, updatePost } from '../controllers/posts';
const router=express.Router();

router.post('/',postExpressValidator(),validate,postPosts);
router.patch('/:id',updatePost);
router.get('/',getPosts);
router.delete('/delete/:id',deletePost);

export default router