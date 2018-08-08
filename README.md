## 基于
react+koa2+webpack4+es6

## 目录

    ├── server  // node 服务端
    │   ├── controllers
    │   │   ├── xxxx.js
    │   │   ├── xxxx.js
    │   │   ├── xxxx.js
    │   │   ├── xxxx.js
    │   │   └── xxxx.js
    │   ├── middleware
    │   ├── routers
    │   ├── services
    │   ├── views
    │   └──app.js
    ├── web  // web 前端
    │   ├── build
    │   │   ├── webpack.base.config.js
    │   │   ├── webpack.dev.config.js
    │   │   └── webpack.prod.config.js
    │   ├── dist
    │   │   ├── js
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   ├── css
    │   │   └── images
    │   ├── src
    │   │   ├── _common
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   ├── api
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   ├── assets
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   ├── components
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   ├── pages
    │   │   │   ├── xxxx.js
    │   │   │   ├── xxxx.js
    │   │   │   └── xxxx.js
    │   └── static
    ├── babelrc       //  配置babel的转义成es2015
    ├── editorconfig  //  配置编辑器统一的代码风格
    ├── gitignore     //  配置哪些文件不往git上面传
    ├── package.json
    └── readme.md
    

## 启动项目

# 将react文件打包编译
npm run dev

# 启动node服务
npm start