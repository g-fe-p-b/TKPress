import express, { static } from 'express';
import { urlencoded, json } from "body-parser";
import connection, { authenticate } from "./src/config/database";
import session, { Store } from "express-session";
const SequelizeStore = require("connect-session-sequelize")(Store);
import compression from 'compression';
import { contentSecurityPolicy } from 'helmet';
import { join } from 'path';
const app = express();

// controllers
import categoriesController from "./src/controllers/categoriesController";
import articlesController from "./src/controllers/articlesController";
import authController from "./src/controllers/authController";

// models
import { findAll, findOne } from "./src/models/Article";
import Category from "./src/models/Category";
import User from "./src/models/User";

// middlewares
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(static('public'));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(compression());

const scriptSrcUrls = [
  "'self'",
  "https://cdn.tiny.cloud", 
  "https://code.jquery.com", 
  "https://cdn.jsdelivr.net"
];

const styleSrcUrls = [
  "'self'",
  "https://cdn.jsdelivr.net", 
  "https://fonts.googleapis.com",
  "'unsafe-inline'"
];

const connectSrcUrls = [
  "'self'",
  "https://cdn.jsdelivr.net",
  "https://cdn.tiny.cloud"
];


app.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSrcUrls,
      styleSrc: styleSrcUrls,
      connectSrc: connectSrcUrls,
      imgSrc: ["'self'", "data:", "blob:", "https://sp.tinymce.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  })
);

// session store (usando Sequelize)
const sessionStore = new SequelizeStore({ db: connection });
app.use(session({
  secret: process.env.SESSION_SECRET || "trocar-esta-chave-em-producao",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dia
}));
sessionStore.sync();

// expose flash and current user to views
app.use((req, res, next) => {
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  res.locals.currentUser = req.session.userId ? {
    id: req.session.userId,
    name: req.session.userName,
    email: req.session.userEmail
  } : null;
  next();
});

// Database
authenticate()
  .then(() => console.log("Successfully connected to the database."))
  .catch(err => console.error(err));

// mount controllers
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", authController);

// rota home
app.get("/", (req, res) => {
  findAll({
    order: [['id', 'DESC']],
    include: [{ model: Category }],
    limit: 10
  }).then(articles => {
    res.render("index", { articles });
  }).catch(err => {
    console.error(err);
    res.render("index", { articles: [] });
  });
});

// rota para exibir artigo
app.get("/articles/:slug", (req, res) => {
  let slug = req.params.slug;
  findOne({ where: { slug: slug }})
    .then(article => {
      if (article != undefined) {
        res.render("articles", { article: article });
      } else {
        res.redirect("/");
      }
    }).catch(err => {
      console.error(err);
      res.redirect("/");
    });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// API para checar usuário autenticado
app.get("/api/me", (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      id: req.session.userId,
      name: req.session.userName,
      email: req.session.userEmail
    });
  } else {
    res.json(null);
  }
});


app.listen(8080, () => console.log("Server online on port 8080"));
