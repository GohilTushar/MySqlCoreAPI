import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./user.model.js";

const Book = sequelize.define(
  "Book",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_of_page: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    released_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
  }
);

Book.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

export default Book;
