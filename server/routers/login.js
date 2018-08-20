const router = require('koa-router')();   // 查了一下是工厂模式实例化对象
const loginPage = require('../controllers/login.js');

router.get('/login', loginPage)

module.exports = router