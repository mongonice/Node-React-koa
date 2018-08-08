const Router = require('koa-router');
const router = new Router();
const pageIndex = require('../controllers/index.js');

router.get('/index', pageIndex.indexPage)
module.exports = router