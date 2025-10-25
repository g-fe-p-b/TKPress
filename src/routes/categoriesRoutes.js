import { Router } from 'express';
const router = Router();
import categoryController from '../controllers/categoriesController';

router.get('/');
router.get('/new');
router.post('/save');
router.post('/index');

export default router;