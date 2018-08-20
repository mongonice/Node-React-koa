const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = true;

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
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',  // 入口文件引用的css文件
            chunkFilename: devMode ? '[id].css': '[id].[hash].css'  // 第三方库css文件
        }),
        new webpack.HotModuleReplacementPlugin(), //一般不用配置
        new HtmlWebpackPlugin({
            template: tempEjs,
            chunksSortMode: 'none'
        })
    ],
    devServer: {
        // proxy: {
        //     '/api/*': {
        //         target: 'http://127.0.0.1:11225',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'调用'http://10.1.5.11:8080/xxx/duty?time=2017-07-07 14: 14:57:22'，直接写‘/api/xxx/duty?time=2017-07-07 14:57:22’即可
        //         }
        //     }
        // }
    },
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