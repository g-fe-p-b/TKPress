import { Router } from "express";
const router = Router();
import { register, login, showUsers } from "../controllers/authController.js";

router.post('/register', register);
router.post('/login', login);
router.get("/users", showUsers);

export default router;