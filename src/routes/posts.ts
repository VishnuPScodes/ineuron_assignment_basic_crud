import express from 'express';
import {
  paramsValidator1,
  postExpressValidator
} from '../middlewares/expressvalidators';
import {
  deletePost,
  getPosts,
  postPosts,
  updatePost,
} from '../controllers/posts';
const router = express.Router();
// router.post('/', postExpressValidator(), postPosts);
router.post('/', postExpressValidator, postPosts);
router.patch(
  '/:id',
  paramsValidator1,
  updatePost
);

router.get('/', getPosts);
router.delete('/:id', paramsValidator1, deletePost);
export default router;