const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Comment extends Model { }

Comment.init(
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogPost",
        key: "id",
      },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
        },
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "comment",
  }
);

module.exports = Comment;
