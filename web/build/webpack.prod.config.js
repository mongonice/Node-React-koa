const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({//编译时，定义全局变量
            'process.env.NODE_ENV': JSON.stringify('production') 
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            }
        })
    ]
})