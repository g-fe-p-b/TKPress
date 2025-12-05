// auth/authController.js
import User from "../models/User.js";
import { Router } from "express";
const router = Router();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


// Rota para registro (POST /auth/register)
export async function register(req: any, res: any, next?: any) {
  const {email, password, cpf, name} = req.body as any;
  if (!name || !email || !password || !cpf) {
    req.flash ('error', "Preencha todos os campos." );
    return req.session.save(() => res.redirect("/"));
  }
  try {
    const exists = await User.findOne({ where: { email } }) as any;
    if (exists) {
      req.flash ( "error", "Email já cadastrado.");
      return req.session.save(() => res.redirect("/"));
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, cpf, email, password: hash }) as any;

    // login automático
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userCpf = user.cpf;

    req.flash("success", "Conta criada e autenticada.");
    return req.session.save(() => res.redirect("/"));
  } catch (err) {
    console.error(err);
    req.flash("error", "Erro ao criar conta.");
    return req.session.save(() => res.redirect("/"));
  }
}


  
// Login (POST /auth/login)
export async function login(req: any, res: any) {
  const {email, password} = req.body as any;
  if (!email || !password) {
    req.flash ('error', "Preencha email e senha." );
    return req.session.save(() => res.redirect("/"));
  } try {
    const user = await User.findOne({ where: { email } }) as any;
    if (!user) {
      req.flash ('error', "Credenciais inválidas." );
      return req.session.save(() => res.redirect("/"));
    };
    const match = await bcrypt.compare(password, user.passwordHash || user.password);
    if (!match) {
      req.flash ('error', "Credenciais inválidas." );
      return req.session.save(() => res.redirect("/"));
    }
    //autenticar
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userCpf = user.cpf;
    req.flash("success", "Bem vindo de volta!");
    const redirectTo = req.session.returnTo || "/articles/index";
    return req.session.save(() => res.redirect(redirectTo));
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro no servidor.');
    return req.session.save(() => res.redirect("/"));
  };
};


// Logout (GET /auth/logout)
router.get("/auth/logout", (req: any, res: any) => {
  req.session.destroy((err: any) => {
    res.redirect("/");
  });
});

export async function showUsers(req: any, res: any) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as any).message });
  }
};

export default {register, login, showUsers};
