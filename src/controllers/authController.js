// auth/authController.js
import User from "../models/User.js";
import { Router } from "express";
const router = Router();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


// Rota para registro (POST /auth/register)
export async function register({name, cpf, email, password}){
  if (!name || !email || !password) {
    req.session.flash = { type: "error", message: "Preencha todos os campos." };
    return res.redirect("/");
  }
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      req.session.flash = { type: "error", message: "Email já cadastrado." };
      return res.redirect("/");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, cpf, email, passwordHash: hash });

    // login automático
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userCpf = user.cpf;

    req.session.flash = { type: "success", message: "Conta criada e autenticada." };
    res.redirect("/articles/index");
  } catch (err) {
    console.error(err);
    req.session.flash = { type: "error", message: "Erro ao criar conta." };
    res.redirect("/");
  }
}


  
// Login (POST /auth/login)
export async function login(req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    req.session.flash = {type: "error", message: "Preencha email e senha."};
    return res.redirect("/");
  } try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.session.flash = { type: "error", message: "Credenciais inválidas."};
      return res.redirect("/");
    };
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      req.session.flash = { type: "error", message: "Credenciais inválidas." };
      return res.redirect("/");
    }
    //autenticar
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.user.Cpf = user.cpf;
    req.session.flash = { type: "success", message: "Autenticado com sucesso."};
    const redirectTo = req.session.returnTo || "/articles/index";
    res.redirect(redirectTo);
  } catch (err) {
    console.error(err);
    res.redirect("/");
  };
};


// Logout (GET /auth/logout)
router.get("/auth/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

export default {register, login};
