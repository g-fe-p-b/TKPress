import { DataTypes } from "sequelize";
import connection from "../config/database.js";
import Category from "./Category.js";


const Article = connection.define('articles', {
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull:false
    }
})

Category.hasMany(Article, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
Article.belongsTo(Category, { foreignKey: 'categoryId' });

export default Article;