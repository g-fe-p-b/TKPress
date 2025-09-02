const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//view engine
app.set('view engine', 'ejs');

//express aceitar arquivos estáticos
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Database
connection
    .authenticate()
    .then(() => {
        console.log("Successfully connected to the database.")
    }).catch((error) => {
        console.log(error)
    })


app.use("/", categoriesController)
app.use("/", articlesController)


app.get("/", (req, res) => {

    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
    res.render("index", {articles: articles})
    })
})


app.get("/:slug", (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            res.render("articles", {article: article} )
        }else{
            res.redirect("/")
        }
    }).catch(error =>{
        res.redirect("/")
    })
})

app.listen(8080, () => {
    console.log("Server online!")
})