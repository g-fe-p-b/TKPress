import { DataTypes } from "sequelize";
import { define } from "../config/database";
import Category, { hasMany } from "./Category";


const Article = define('articles', {
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

hasMany(Article, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
Article.belongsTo(Category, { foreignKey: 'categoryId' });

export default Article;