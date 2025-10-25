// articles/articlesController.js
import { Router } from "express";
const router = Router();
import Category, { findAll } from "../models/Category";
import slugify from "slugify";
import { findAll as _findAll, create, destroy } from "../models/Article";
import ensureAuth from "../middleware/auth";
import sanitizeHtml, { defaults } from "sanitize-html";

// Lista pública de artigos (página /articles)
router.get("/articles", (req, res) => {
  _findAll({
    include: [{ model: Category }],
    order: [['id', 'DESC']]
  }).then(articles => {
    res.render("admin/articles/index", { articles });
  }).catch(err => {
    console.error(err);
    res.redirect("/");
  });
});

// Rota para criar novo artigo (form) — protegida
router.get("/articles/new", (req, res) => {
  findAll().then(categories => {
    res.render("admin/articles/newArticle", { categories });
  }).catch(err => {
    console.error(err);
    res.redirect("/articles");
  });
});

// Salvar novo artigo — protegido e sanitiza conteúdo
router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body;
  if (!title || !body) {
    req.session.flash = { type: "error", message: "Título e conteúdo são obrigatórios." };
    return res.redirect("/articles");
  } else{
  const safeBody = sanitizeHtml(body, {
    allowedTags: defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      '*': ['class', 'id']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'data']
  });
  create({
    title,
    slug: slugify(title, { lower: true, strict: true }),
    body: safeBody,
    categoryId: category || null
  }).then(() => {
    req.session.flash = { type: "success", message: "Artigo criado com sucesso." };
    res.redirect("/articles");
  }).catch(err => {
    console.error("Erro ao salvar artigo:", err);
    req.session.flash = { type: "error", message: "Erro ao salvar o artigo." };
    res.redirect("/articles");
  });
}});

// Deletar artigo — protegido
router.post("/articles/delete", (req, res) => {
  const id = req.body.id;
  if (id) {
    destroy({ where: { id } })
      .then(() => {
        req.session.flash = { type: "success", message: "Artigo deletado." };
        res.redirect("/articles");
      })
      .catch(err => {
        console.error(err);
        res.redirect("/articles");
      });
  } else {
    res.redirect("/articles");
  }
});

// Lista admin — protegido
router.get("/articles/index", ensureAuth, (req, res) => {
  _findAll({ include: [{ model: Category }], order: [['id', 'DESC']] })
    .then(articles => res.render("/articles", { articles }))
    .catch(err => {
      console.error(err);
      res.redirect("/");
    });
});

export default router;