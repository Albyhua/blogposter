// Importing the 'Model' and 'DataTypes' classes from the 'sequelize' library.
// 'Model' helps in defining the data model for a table, and 'DataTypes' define the type of each column in the table.
const { Model, DataTypes } = require('sequelize');

// to manage password hashing and verification.
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

class User extends Model {
  // checks if an input password (loginPw) matches the hashed password stored for the user.
  checkPassword(loginPw) {
    // Using bcrypt's 'compareSync' method to compare the plain-text password with the hashed version.
    // 'this.password' refers to the stored hashed password for the current user instance.
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// need to connect this when a user types in a username and password
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  { //allows functions that get executed in the database before a new user is created
    hooks: {
      beforeCreate: async (newUserData) => {
          // Hashing the user's password with bcrypt before storing it in the database.
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize, // Associating this model with the imported 'sequelize' instance.
    freezeTableName: true,  // Preventing Sequelize from modifying table names.
    modelName: 'user', // naming th emodel for use in sequelize
  }
);

module.exports = User;
