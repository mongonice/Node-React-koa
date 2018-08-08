const Router = require('koa-router');
const router = new Router();
const todoPage = require('../controllers/todo.js');

router.get('/todo', todoPage.indexPage)
module.exports = router