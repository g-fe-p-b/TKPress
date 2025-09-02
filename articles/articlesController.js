const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const slugify = require("slugify");
const Article = require("./Article");

router.get("/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
            res.render("admin/articles/index", {articles:articles});
    })
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/newArticle", {categories: categories});
    })
});


router.post("/articles/save", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;
    

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/articles")
    })
});

router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new");
});

router.post("/articles/delete", (req,res) =>{
    let id = req.body.id
    if(id != undefined){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/articles")
            })
    }else{ //SE O ID FOR NULL 
        res.redirect("/articles")
    }
})


module.exports = router;