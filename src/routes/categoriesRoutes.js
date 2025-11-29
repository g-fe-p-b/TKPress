import { Router } from 'express';
const router = Router();
import { allCategories, deleteCategory, editCategory, newCategory, saveCategory, updateCategory } from '../controllers/categoriesController.js';

router.get('/', allCategories);
router.get('/new', newCategory);
router.post('/save', saveCategory);
router.post('/delete', deleteCategory);
router.get('/edit/:id', editCategory);
router.post('/update', updateCategory);

export default router;