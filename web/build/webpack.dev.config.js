const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // devtool: 'source-map',
    // plugins: [
    //     new webpack.DefinePlugin({//编译时，定义全局变量
    //         'process.env.NODE_ENV': JSON.stringify('development') 
    //     }),
    // ]
})