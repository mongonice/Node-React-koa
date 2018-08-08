const Router = require('koa-router');
const router = new Router();
const detailPage = require('../controllers/detail.js');

router.get('/detail', detailPage.indexPage)

module.exports = router