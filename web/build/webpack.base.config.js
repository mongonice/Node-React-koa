const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name: 'browser',
    entry: {
        index: path.resolve(__dirname, '..', './src/index.js'),
        todo: path.resolve(__dirname, '..', './src/todo.js'),
        detail: path.resolve(__dirname, '..', './src/detail.js'),
        vendor: ['react', 'react-dom']  // 第三方库入口
    },
    output: {
        path: path.resolve(__dirname, '..','dist'),
        filename: './js/[name].js',
        chunkFilename: './js/[name].js',
        // chunkFilename: './js/[name].chunk.[chunkhash:8].js',
        publicPath: './dist/'
        // publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {//不用每个文件都要引入babel的辅助代码，在运行时，那个文件需要就引用
                        // presets: ['@babel/preset-env'],
                        // plugins: ['@babel/transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader'
            //     })
            // },
            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'less-loader']
            //     })
            // },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })

            // }
        ]
    },
    devtool: '',
    plugins: [
        // new ExtractTextPlugin('css/[name].css'), 
        new MiniCssExtractPlugin('[name].css'),
        // new webpack.optimize.CommonsChunkPlugin({// 已经被移除了
        //     name: 'vendor', // 公共chunk在入口配置中的名称叫vendor
        //     filename: 'js/[name].js',
        //     minChunks: Infinity  // 随着entry chunk越来越多，确保没有其它模块会打包进 vendor chunk中
        // }),
        // new webpack.ProvidePlugin({
        //     '$': 'jquery'
        // }),
        new webpack.HotModuleReplacementPlugin() //一般不用配置
    ],
    // devServer: {
    //     contentBase: path.join()
    // },
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "initial",
              test: "vendor",
              name: "vendor",
              enforce: true
            }
          }
        }
    }
}