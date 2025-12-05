// categories/categoriesController.js
import Category from "../models/Category.js";
import slugify from "slugify";

// Form para nova categoria
export async function newCategory(req: any, res: any){
  try{
    res.render("admin/categories/new");
  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as any).message });
  }
};

// Salvar nova categoria
export async function saveCategory(req: any, res: any) {
  const title = (req.body as any).title;
  if (title && title.trim() !== "") {
    Category.create({
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
};

// Index de categorias
export async function allCategories(req: any, res: any) {
    Category.findAll().then(categories => {
      res.render("admin/categories/index", { categories });
    }).catch(err => {
      console.error(err);
      res.redirect("/");
    });
};

// Deletar
export async function deleteCategory(req: any, res: any) {
  const id = (req.body as any).id;
    if (id) {
      Category.destroy({ where: { id } })
        .then(() => res.redirect("/categories"))
        .catch(err => {
          console.error(err);
          res.redirect("/categories");
        });
    } else {
      res.redirect("/categories");
    }
};


// Editar (GET)
export async function editCategory(req: any, res: any) {
  const id = (req.params as any).id;
    if (isNaN(id)) {
      return res.redirect("admin/categories/index");
    }
    Category.findByPk(id).then(category => {
      if (category) res.render("admin/categories/edit", { category });
      else res.redirect("admin/categories/index");
    }).catch(err => {
      console.error(err);
      res.redirect("admin/categories/index");
    });    
}


// Atualizar (POST)
export async function updateCategory(req: any, res: any) {
  const { id, title } = req.body as any;
    if (!id || !title) return res.redirect("/categories/update");

    Category.update({ title, slug: slugify(title, { lower: true, strict: true }) }, {
      where: { id }
    }).then(() => {
      res.redirect("/categories");
    }).catch(err => {
      console.error(err);
      res.redirect("/categories");
    });
}

export default {newCategory, saveCategory, allCategories, deleteCategory, editCategory, updateCategory};
