const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 多线程压缩打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const removeConsolePlugin = require('babel-plugin-transform-remove-console');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    exclude: /node_modules/
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // 内置图片资源处理,无需额外安装loader
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]-[hash:base64:5]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/template.html'),
            title: 'recoil demo'
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: '@ryan.ke'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    resolve: {
        alias: {
            '@assets': path.join(__dirname, 'src/assets')
        }
    },
    optimization: {
        minimize: true, // 开启压缩
        minimizer: [new TerserPlugin({
            parallel: true, // 并行压缩,也可以设置核心数
            extractComments:  false, // 是否需要生成LICENSE.txt
            exclude: /node_modules/,
            terserOptions: { // 在文件头部增加注释信息
                format: {
                  comments: /@license/i,
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: false,
                    inline: 2,
                    pure_funcs: ["console.log"]
                }
            },
        })],
        splitChunks: {
            chunks: 'async',
            minSize: 100000, //拆分之前的最小体积 单位byte: 20000/1024=19.53kb
            minRemainingSize: 0,
            maxSize: 110*1024, //拆分之前的最大体积 最大100kb
            minChunks: 1,
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
            maxInitialRequests: 3, // 最大初始化请求数
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true,
                    minChunks: 1,
                    reuseExistingChunk: true,
                    maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
                    maxInitialRequests: 3 // 最大初始化请求数
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}