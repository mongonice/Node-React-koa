const router = require('koa-router')();
// const router = new Router();
// const r_index = require('./index.js');
// const r_detail = require('./detail.js');
// const r_todo = require('./todo.js');

// router.use('/', r_index.routes(), r_index.allowedMethods())
//     .use('/', r_detail.routes(), r_detail.allowedMethods())
//     .use('/', r_todo.routes(), r_todo.allowedMethods())

const index_page = require('../controllers/index.js');
const detail_page = require('../controllers/detail.js');
const todo_page = require('../controllers/todo.js');


router.get('/', index_page)
router.get('/detail', detail_page)
router.get('/todo', todo_page)

module.exports = router