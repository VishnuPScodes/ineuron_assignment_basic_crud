import express from 'express';
import {
  combineValidate,
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
// router.post('/', postExpressValidator(), postPosts);
router.post('/',combineValidate(),postPosts);
router.patch(
  '/:id',
  paramsValidator(),
  updatePost
);
router.get('/', getPosts);
router.delete('/:id', paramsValidator(), deletePost);
export default router;