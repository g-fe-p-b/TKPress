import express from 'express';
import bodyParser from "body-parser";
import connection from "./src/config/database.js";
import session from "express-session";
import compression from 'compression';
import { contentSecurityPolicy } from 'helmet';
import { join } from 'path';
import sequelize from "./src/config/database.js";
import flash from "connect-flash";
const app = express();

// controllers
import categoriesRoutes from "./src/routes/categoriesRoutes.js";
import articlesRoutes from "./src/routes/articlesRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

// models
import Article from "./src/models/Article.js";
import Category from "./src/models/Category.js";
import User from "./src/models/User.js";

// middlewares
app.set('view engine', 'ejs');
app.set('views', join('views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.use(session({
  secret: "senha-secreta",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 3600000
  }
}));
app.use(flash());

app.use((req,res,next) => {
  res.locals.user = req.session.user || null;
  res.locals.messages = req.flash();
  next();
});

// Database
connection.authenticate()
  .then(() => console.log("Successfully connected to the database."))
  .catch(err => console.error(err));

// mount controllers
app.use("/categories", categoriesRoutes);
app.use("/articles", articlesRoutes);
app.use("/auth", authRoutes);

// rota home
app.get("/", (req, res) => {
  Article.findAll({
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
  Article.findOne({ where: { slug: slug }})
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



app.get("/auth/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});



const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi estabelecida com sucesso.");
    await sequelize.sync(); 
    console.log("Tabelas sincronizadas com o banco de dados.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Não foi possível conectar ao banco de dados:", err);
  }
};
startServer();

// app.listen(8080, () => console.log("Server online on port 8080"));
