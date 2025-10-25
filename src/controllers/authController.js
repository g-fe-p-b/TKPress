// auth/authController.js
import { Router } from "express";
const router = Router();
import { hash as _hash, compare } from "bcrypt";
import { findOne, create } from "../models/User";

// Rota para registro (POST /auth/register)
router.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    req.session.flash = { type: "error", message: "Preencha todos os campos." };
    return res.redirect("/");
  }

  try {
    const exists = await findOne({ where: { email } });
    if (exists) {
      req.session.flash = { type: "error", message: "Email já cadastrado." };
      return res.redirect("/");
    }

    const hash = await _hash(password, 10);
    const user = await create({ name, email, passwordHash: hash });

    // login automático
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    req.session.flash = { type: "success", message: "Conta criada e autenticada." };
    res.redirect("/articles/index");
  } catch (err) {
    console.error(err);
    req.session.flash = { type: "error", message: "Erro ao criar conta." };
    res.redirect("/");
  }
});

// Login (POST /auth/login)
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.session.flash = { type: "error", message: "Preencha email e senha." };
    return res.redirect("/");
  }

  try {
    const user = await findOne({ where: { email } });
    if (!user) {
      req.session.flash = { type: "error", message: "Credenciais inválidas." };
      return res.redirect("/");
    }

    const match = await compare(password, user.passwordHash);
    if (!match) {
      req.session.flash = { type: "error", message: "Credenciais inválidas." };
      return res.redirect("/");
    }

    // autenticar
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    req.session.flash = { type: "success", message: "Autenticado com sucesso." };
    const redirectTo = req.session.returnTo || "/articles/index";
    delete req.session.returnTo;
    res.redirect(redirectTo);
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

// Logout (GET /auth/logout)
router.get("/auth/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

export default router;
