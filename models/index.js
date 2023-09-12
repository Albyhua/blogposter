const User = require('./user');
const BlogPost = require('./blogpost');
const Comment = require('./comment');

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(BlogPost, { 
    foreignKey: 'user_id', 
    onDelete: 'CASCADE',
})

User.hasMany(Comment, { 
    foreignKey: 'user_id', 
    onDelete: 'CASCADE',
})

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
})

BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, BlogPost, Comment };
