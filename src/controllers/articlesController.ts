// articles/articlesController.js
import Category from "../models/Category.js";
import slugify from "slugify";
import Article from "../models/Article.js";
import ensureAuth from "../middleware/auth.js";
import sanitizeHtml from "sanitize-html";

// Lista pública de artigos (página /articles)
export async function allArticles(req: any, res: any) {
  Article.findAll({
    include: [{ model: Category }],
    order: [['id', 'DESC']]
  }).then(articles => {
    res.render("admin/articles/index", { articles });
  }).catch(err => {
    console.error(err);
    res.redirect("/");
  });
};

// Rota para criar novo artigo (form)
export async function newArticle(req: any, res: any) {
  Category.findAll().then(categories => {
    res.render("admin/articles/newArticle", { categories });
  }).catch(err => {
    console.error(err);
    res.redirect("/articles");
  });
};

// Salvar novo artigo — sanitiza conteúdo
export async function saveArticle(req: any, res: any) {
  const { title, body, category } = req.body as any;
  if (!title || !body) {
    req.session.flash = { type: "error", message: "Título e conteúdo são obrigatórios." };
    return res.redirect("/articles");
  } else{
    const safeBody = sanitizeHtml(body, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
      allowedAttributes: {
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'alt', 'width', 'height'],
        '*': ['class', 'id']
      },
      allowedSchemes: ['http', 'https', 'mailto', 'data']
    });
    Article.create({
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
  };
};


// Deletar artigo
export async function deleteArticle(req: any, res: any) {
  const id = (req.body as any).id;
  if (id) {
    Article.destroy({ where: { id } }).then(() => {
      req.session.flash = { type: "success", message: "Artigo deletado." };
      res.redirect("/articles");
    }).catch(err => {
      console.error(err);
      res.redirect("/articles");
    });
  } else {
    res.redirect("/articles");
  }; 
};


// Lista admin
export async function indexArticles(req: any, res: any) {
  Article.findAll({ include: [{ model: Category }], order: [['id', 'DESC']] })
  .then(articles => res.render("/articles", { articles }))
  .catch(err => {
    console.error(err);
    res.redirect("/");
  });
};

export default {allArticles, newArticle, saveArticle, deleteArticle, indexArticles};