// categories/categoriesController.js
import { Router } from "express";
const router = Router();
import { create, findAll, destroy, findByPk, update } from "../models/Category";
import slugify from "slugify";

// Form para nova categoria (protegido)
router.get("/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

// Salvar nova categoria (protegido)
router.post("/categories/save", (req, res) => {
  const title = req.body.title;
  if (title && title.trim() !== "") {
    create({
      title: title.trim(),
      slug: slugify(title, { lower: true, strict: true })
    }).then(() => {
      res.redirect("/categories");
    }).catch(err => {
      console.error(err);
      res.redirect("admin/categories/new");
    });
  } else {
    res.redirect("admin/categories/new");
  }
});

// Index de categorias (protegido)
router.get("/categories", (req, res) => {
  findAll().then(categories => {
    res.render("admin/categories/index", { categories });
  }).catch(err => {
    console.error(err);
    res.redirect("/");
  });
});

// Deletar (protegido)
router.post("/categories/delete", (req, res) => {
  const id = req.body.id;
  if (id) {
    destroy({ where: { id } })
      .then(() => res.redirect("/categories"))
      .catch(err => {
        console.error(err);
        res.redirect("/categories");
      });
  } else {
    res.redirect("/categories");
  }
});

// Editar (GET) — protegido
router.get("/categories/edit/:id", (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.redirect("admin/categories/index");
  }
  findByPk(id).then(category => {
    if (category) res.render("admin/categories/edit", { category });
    else res.redirect("admin/categories/index");
  }).catch(err => {
    console.error(err);
    res.redirect("admin/categories/index");
  });
});

// Atualizar (POST) — protegido
router.post("/categories/update", (req, res) => {
  const { id, title } = req.body;
  if (!id || !title) return res.redirect("/categories/update");

  update({ title, slug: slugify(title, { lower: true, strict: true }) }, {
    where: { id }
  }).then(() => {
    res.redirect("/categories");
  }).catch(err => {
    console.error(err);
    res.redirect("/categories");
  });
});

export default router;
