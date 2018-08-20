// server 服务的启动页
const path = require('path');
const Koa = require('koa');
const KoaConvert = require('koa-convert');         // 用来支持Koa1 和 Koa2

// 引入一堆中间件
const KoaViews = require('koa-views');             // 模板编译引擎 就是将ejs模板编译解析成html
const KoaStatic = require('koa-static');           // 将静态资源路径写成绝对路径
const KoaBodyparser = require('koa-bodyparser');   // post请求时用来解析 body
const KoaLogger = require('koa-logger');           // 打印输出日志

// 引入路由

const routers = require('./routers/routes.js');

console.log(routers)

const app = new Koa();

// app.use(KoaConvert(middleware))

// 使用中间件
app.use(KoaLogger())

app.use(KoaBodyparser())

// app.use(KoaStatic(
//     path.join(__dirname , './../web/dist')  // 注意这里是将webpack编译过得静态文件的路径变成绝对路径，就是dist下面的文件路径
// ))

app.use(KoaViews(path.join(__dirname, './views'), {  // 用来解析 以ejs结尾的模板引擎，ejs通过link或者script引入react文件编译之后的文件
    extension: 'ejs'
}))

app.use(routers.routes())
    .use(routers.allowedMethods())

app.listen('3008', () => {
    console.log('[demo] server is starting port 3008')
})
