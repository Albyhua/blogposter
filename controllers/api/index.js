const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./comment.js');
const profileRoute = require('./profile');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/profile', profileRoute);

module.exports = router;
