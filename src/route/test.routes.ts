import { Router } from 'express';
import Controller from '../controller/test.controller';
import authMiddleware from '../middleware/auth.middleware';


const router = Router();
const controller = new Controller();

router.get('/', authMiddleware, controller.getAll);
router.get('/:id', authMiddleware, controller.testDetail);
router.post('/', controller.createTest);
router.post('/check', controller.checkResult);
router.delete('/:id', authMiddleware, controller.deleteTest);

export default router