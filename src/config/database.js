import Sequelize from "sequelize";

const connection = new Sequelize('guiapressdb', 'root', '81876133', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

export default connection;