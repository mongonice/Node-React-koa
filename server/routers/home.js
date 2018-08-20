const router = require('koa-router')();
const homePage = require('../controllers/home.js');

router.get('/', homePage)

module.exports = router