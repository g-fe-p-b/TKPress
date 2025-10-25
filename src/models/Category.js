import { DataTypes } from "sequelize";
import { define } from "../config/database";

const Category = define('categories', {
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


export default Category;