import { Router } from "express";
const router = Router();
import {allArticles, newArticle, saveArticle, deleteArticle, indexArticles} from "../controllers/articlesController.js";

router.get('/', allArticles);
router.get('/new', newArticle);
router.post('/save', saveArticle);
router.post('/delete', deleteArticle);
router.get('/index', indexArticles);

export default router;