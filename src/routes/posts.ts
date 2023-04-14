import express from 'express';
import { PostDeleteController, postGetController, postPostController, PostUpdateController } from '../controllers/posts';

const router=express.Router();

router.post('/',postPostController);
router.patch('/:id',PostUpdateController);
router.get('/',postGetController);
router.delete('/delete/:id',PostDeleteController);

export default router