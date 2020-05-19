import { Router } from 'express';
import Controller from '../controller/level.controller';
import authMiddleware from '../middleware/auth.middleware';


const router = Router();
const controller = new Controller();

router.get('/', controller.getAll);
router.post('/', authMiddleware, controller.addLevel);
router.put('/:id', authMiddleware, controller.updateLevel);
router.delete('/:id', authMiddleware, controller.deleteLevel);

export default router