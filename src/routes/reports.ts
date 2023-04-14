import express from 'express';
import { getReportsController } from '../controllers/report';

const router = express.Router();

router.get('/', getReportsController);
router.get('/', getReportsController);
router.get('/', getReportsController);
router.get('/', getReportsController);
router.get('/', getReportsController);

export default router;
