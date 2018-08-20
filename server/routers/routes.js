const router = require('koa-router')();
// const homePage = require('../controllers/home.js');
// const loginPage = require('../controllers/login.js');
// router.get('/', homePage)
// router.get('/login', loginPage)

const homePage = require('./home.js');
const loginPage = require('./login.js');

router.use(homePage.routes(), homePage.allowedMethods())
router.use(loginPage.routes(), homePage.allowedMethods())

module.exports = router