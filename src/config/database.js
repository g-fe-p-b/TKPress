// src/config/database.js
import { Sequelize } from "sequelize";

// O SQLite se conecta a um arquivo.
// 'storage' define o caminho para esse arquivo.
// './guiapress.sqlite' criará o arquivo 'guiapress.sqlite' na raiz do seu projeto.
const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './guiapress.sqlite', // Nome do arquivo do banco de dados
});

export default connection;

// import Sequelize from "sequelize";

// const connection = new Sequelize('guiapressdb', 'root', '81876133', {
//     host: 'localhost',
//     dialect: 'mysql',
//     timezone: '-03:00'
// });

// export default connection;