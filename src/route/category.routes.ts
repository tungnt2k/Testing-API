import { Router } from 'express';
import Controller from '../controller/category.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();
const controller = new Controller();

router.get('/', controller.getAll);
router.post('/', authMiddleware, controller.addCate);
router.put('/:id', authMiddleware, controller.updateCate);
router.delete('/:id', authMiddleware, controller.deleteCate);

export default router