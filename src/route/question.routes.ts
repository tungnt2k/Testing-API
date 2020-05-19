import { Router } from 'express';
import Controller from '../controller/question.controller';
import authMiddleware from '../middleware/auth.middleware';


const router = Router();
const controller = new Controller();

router.get('/', authMiddleware, controller.getAll);
router.get('/category/:categoryId', authMiddleware, controller.getAllByCateId);
router.get('/level/:levelId', authMiddleware, controller.getAllByLevelId);
router.post('/', authMiddleware, controller.addQuestion);
router.put('/:id', authMiddleware, controller.updateQuestion);
router.delete('/:id', authMiddleware, controller.deleteQuestion);
export default router