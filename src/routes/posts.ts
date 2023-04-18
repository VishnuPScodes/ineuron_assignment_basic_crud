import express from 'express';
import {
  paramsValidator,
  postExpressValidator,
  validate,
} from '../middlewares/expressvalidators';
import {
  deletePost,
  getPosts,
  postPosts,
  updatePost,
} from '../controllers/posts';
const router = express.Router();

router.post('/', postExpressValidator(), validate, postPosts);
router.patch(
  '/:id',
  paramsValidator(),
  postExpressValidator(),
  validate,
  updatePost
);
router.get('/', getPosts);
router.delete('/delete/:id', paramsValidator(), validate, deletePost);

export default router;
