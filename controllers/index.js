const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home');

router.use('/api', apiRoutes); 
router.use('/', homeRoutes); // default route

module.exports = router;
