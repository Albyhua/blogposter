const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./user_data.json');
const postData = require('./postdata.json');
const commentData = require('./comment_data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await BlogPost.bulkCreate(postData)
  await Comment.bulkCreate(commentData)

  console.log("Seeding done!");

  process.exit(0);
};

seedDatabase();